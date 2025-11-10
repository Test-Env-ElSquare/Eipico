import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-eipico-layout-two',
  templateUrl: './eipico-layout-two.component.html',
  styleUrls: ['./eipico-layout-two.component.scss'],
})
export class EipicoLayoutTwoComponent implements OnInit, AfterViewInit {
  @ViewChild('mySvg') mySvg!: ElementRef;
  public hubConnection!: signalR.HubConnection;
  showDialog: boolean = false;
  receivedData: any;
  lineStats: any;
  machines: any[] = [];
  filteredMachines: any[] = [];

  constructor(private _LayoutService: LayoutService) {}
  ngOnInit(): void {
    this.onStartConnection();
  }

  onStartConnection() {
    this._LayoutService
      .startConnection()
      .then(() => {
        console.log(' Connected to SignalR Hub');
        this._LayoutService.onAllMachineUpdate((data) => {
          console.log(' Received Data:', data);
          this.receivedData = data;
          this.updateMachinesData(data);
        });

        const factoryId = 3;
        return this._LayoutService.hubConnection.invoke(
          'JoinFactoryGroup',
          factoryId
        );
      })
      .then(() => {
        console.log(' Joined Factory Group');
        console.log(' Requested factory data');
      })
      .catch((err) => {
        console.error(' Error starting or joining SignalR', err);
      });
  }
  //popup
  goToMachineDetails(lineId: string | null) {
    if (!lineId) {
      this.machines = [];
      this.showDialog = false;
      return;
    }

    if (Array.isArray(this.receivedData) && this.receivedData.length > 0) {
      const selectedLine = this.receivedData.find(
        (line) => line.lineId == lineId
      );

      if (selectedLine) {
        const order = ['fill', 'labl', 'cart'];
        const validMachines = selectedLine.machines.filter(
          (m: { machineName: string }) =>
            order.some((key) => m.machineName.toLowerCase().includes(key))
        );

        this.machines = validMachines.sort(
          (a: { machineName: string }, b: { machineName: string }) => {
            const aKey = order.find((key) =>
              a.machineName.toLowerCase().includes(key)
            );
            const bKey = order.find((key) =>
              b.machineName.toLowerCase().includes(key)
            );

            const aIndex = aKey ? order.indexOf(aKey) : order.length;
            const bIndex = bKey ? order.indexOf(bKey) : order.length;

            return aIndex - bIndex;
          }
        );
      } else {
        this.machines = [];
      }
    } else {
      this.machines = [];
    }

    this.showDialog = true;
  }

  getPulseClass(machines: any[]): string {
    const allZero = machines.every((m) => m.state === 0);
    return allZero ? 'pulse-red' : 'pulse-green';
  }

  updateMachinesData(lines: any[]): void {
    console.log('updateMachinesData called');
    this.receivedData = lines;
    const svg = document.getElementById('factory-svg');
    if (!svg) {
      console.log(' SVG not found in DOM!');
      return;
    }

    this.lineStats = lines.map((line: any) => ({
      lineId: line.lineId,
      machineCount: line.machineCount ?? 0,
      lastUpdate: line.machines?.[0]?.latestTimeStamp || 'N/A',
    }));

    lines.forEach((line: any, index: number) => {
      console.log(`Processing line ${index}: lineId=${line.lineId}`);

      const machines = line.machines || [];
      const machineStates = machines.map(
        (m: any) => m.latestSignal?.state ?? 0
      );

      const allZero = machineStates.every((s: number) => s === 0);
      const hasOne = machineStates.some((s: number) => s === 1);

      let fillColor = '#f37d7d';
      let pulseClass = 'pulse-red';

      if (hasOne) {
        fillColor = '#acf3bde0';
        pulseClass = 'pulse-green';
      }

      const selector = `[data-line-id="${line.lineId}"]`;
      const lineRect = svg.querySelector(selector);

      if (!lineRect) {
        console.warn(` No rect found for ${selector}`);
        return;
      }

      lineRect.classList.remove('pulse-green', 'pulse-red');
      lineRect.setAttribute('fill', fillColor);
      lineRect.classList.add(pulseClass);

      this.updateLineTexts(lineRect, line);
    });
  }
  //handle date
  formatDateTime(value: string | Date): string {
    if (!value) return 'N/A';
    const date = new Date(value);

    return date.toLocaleString('en-US', {
      // weekday: 'short',
      year: 'numeric',
      month: 'short', // Nov
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  // show count machines and last update
  updateLineTexts(lineRect: Element, line: any): void {
    const parentGroup = lineRect.closest('g[data-cell-id]');
    if (!parentGroup) return;

    const numOfMachine = line.machineCount;
    const lastUpdate =
      line.machines?.[line.machines.length - 1]?.latestTimeStamp ?? 'N/A';

    const rectX = parseFloat(lineRect.getAttribute('x')!);
    const rectY = parseFloat(lineRect.getAttribute('y')!);
    const rectWidth = parseFloat(lineRect.getAttribute('width')!);

    const textX = rectX + rectWidth - 240;
    const countY = rectY + 45;
    const updateY = rectY + 65;

    let countText = parentGroup.querySelector(
      '.machine-count'
    ) as SVGTextElement;
    if (!countText) {
      countText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      countText.classList.add('machine-count');
      parentGroup.appendChild(countText);
    }
    countText.setAttribute('x', textX.toString());
    countText.setAttribute('y', countY.toString());
    countText.setAttribute('fill', '#000');
    countText.setAttribute('font-size', '18px');
    countText.textContent = `Machines: ${numOfMachine}`;

    let updateText = parentGroup.querySelector(
      '.last-update'
    ) as SVGTextElement;
    if (!updateText) {
      updateText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      updateText.classList.add('last-update');
      parentGroup.appendChild(updateText);
    }
    updateText.setAttribute('x', textX.toString());
    updateText.setAttribute('y', updateY.toString());
    updateText.setAttribute('fill', '#000');
    updateText.setAttribute('font-size', '20px');
    updateText.textContent = ` ${this.formatDateTime(lastUpdate)}`;
  }

  getMachineCount(lineId: number): number {
    const line = this.lineStats?.find((l: any) => l.lineId === lineId);
    return line ? line.machineCount : 0;
  }

  getLastUpdate(lineId: number): string {
    const line = this.lineStats?.find((l: any) => l.lineId === lineId);
    return line ? line.lastUpdate : '—';
  }

  ngAfterViewInit() {
    const el = this.mySvg.nativeElement as HTMLElement;
    const svg = el.querySelector('svg');

    if (svg) {
      ['mousedown', 'mouseup', 'contextmenu'].forEach((evt) => {
        svg.addEventListener(evt, (e) => {
          e.stopPropagation();
        });
      });

      setTimeout(() => {
        const rects = svg.querySelectorAll('rect[data-line-id]');
        console.log('Found rects:', rects.length);
        rects.forEach((rect) => {
          const lineId = rect.getAttribute('data-line-id');
          rect.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            console.log(`Clicked line with ID: ${lineId}`);
            this.goToMachineDetails(lineId);
          });
        });
      }, 1500);
    }
  }
  ngOnDestroy(): void {
    this._LayoutService.stopConnection();
  }
}
