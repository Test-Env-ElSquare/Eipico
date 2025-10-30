import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LayoutService } from '../../layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eipico-layout-one',
  templateUrl: './eipico-layout-one.component.html',
  styleUrls: ['./eipico-layout-one.component.scss'],
})
export class EipicoLayoutOneComponent implements OnInit, AfterViewInit {
  @ViewChild('mySvg') mySvg!: ElementRef;
  public hubConnection!: signalR.HubConnection;
  showDialog: boolean = false;
  receivedData: any;
  // eyeDrops = [
  //   { machineName: 'E1_Eye_L1_Fill', state: 0 },
  //   { machineName: 'E1_Eye_L1_Label', state: 0 },
  //   { machineName: 'E1_Eye_L1_Cart', state: 0 },
  // ];
  // eyeDropsLineTwo = [
  //   { machineName: 'E1_Eye_L2_Fill', state: 0 },
  //   { machineName: 'E1_Eye_L2_Labl', state: 0 },
  //   { machineName: 'E1_Eye_L2_Cart', state: 0 },
  // ];
  // eyeDropsLineThree = [
  //   { machineName: 'E1_Eye_L3_Fill', state: 0 },
  //   { machineName: 'E1_Eye_L3_Labl', state: 0 },
  //   { machineName: 'E1_Eye_L3_Cart', state: 0 },
  // ];

  constructor(private _LayoutService: LayoutService, private _router: Router) {}
  ngOnInit(): void {
    this.onStartConnection();
  }
  goToMachineDetails() {
    this.showDialog = true;
  }
  getLineFillColor(machines: any[]): string {
    const allZero = machines.every((m) => m.state === 0);
    return allZero ? '#dc3545' : '#28a745';
  }
  getPulseClass(machines: any[]): string {
    const allZero = machines.every((m) => m.state === 0);
    return allZero ? 'pulse-red' : 'pulse-green';
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

        const factoryId = 2;
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
  updateMachinesData(lines: any[]) {
    this.receivedData = lines;

    const svg = document.getElementById('factory-svg');
    if (!svg) return;

    lines.forEach((line) => {
      line.machines.forEach((machine: any) => {
        const group = svg.querySelector(
          `[data-machine-name="${machine.machineName}"]`
        );
        if (!group) return;

        const rect = group.querySelector('rect');
        if (!rect) return;

        rect.classList.remove('pulse-green', 'pulse-red');

        const fillColor = machine.state === 1 ? '#28a745' : '#dc3545';
        rect.setAttribute('fill', fillColor);
        rect.classList.add(
          fillColor === '#28a745' ? 'pulse-green' : 'pulse-red'
        );
      });

      const allZero = line.machines.every((m: any) => m.state === 0);
      const fillColor = allZero ? '#dc3545' : '#28a745';
      const pulseClass = allZero ? 'pulse-red' : 'pulse-green';

      const lineRect = svg.querySelector(`[data-line-id="${line.lineId}"]`);
      if (lineRect) {
        lineRect.classList.remove('pulse-green', 'pulse-red');
        lineRect.setAttribute('fill', fillColor);
        lineRect.classList.add(pulseClass);
      }
    });
  }

  // updateMachinesData(machines: any[], data: any) {
  //   this.eyeDrops.forEach((machine) => {
  //     const updated = data.find(
  //       (d: { machineName: string }) => d.machineName === machine.machineName
  //     );
  //     if (updated) machine.state = updated.state;
  //   });

  //   const svg = document.getElementById('factory-svg');
  //   if (!svg) return;

  //   machines.forEach((machine) => {
  //     const group = svg.querySelector(
  //       `[data-machine-name="${machine.machineName}"]`
  //     );
  //     if (!group) return;

  //     const rect = group.querySelector('rect');
  //     if (!rect) return;

  //     rect.classList.remove('pulse-green', 'pulse-red');

  //     const fillColor = machine.state === 1 ? '#28a745' : '#dc3545';
  //     rect.setAttribute('fill', fillColor);

  //     rect.setAttribute(
  //       'class',
  //       fillColor === '#28a745' ? 'pulse-green' : 'pulse-red'
  //     );

  //     const rectX = parseFloat(rect.getAttribute('x') || '0');
  //     const rectY = parseFloat(rect.getAttribute('y') || '0');
  //     const rectWidth = parseFloat(rect.getAttribute('width') || '0');
  //     const rectHeight = parseFloat(rect.getAttribute('height') || '0');
  //     const centerX = rectX + rectWidth / 2;
  //     const labelY = rectY + rectHeight / 2;

  //     ['speed-overlay', 'count-overlay', 'state-indicator'].forEach(
  //       (cls) => {}
  //     );
  //   });
  // }
  // updateMachinesData(machines: any[], data: any) {

  //   this.eyeDrops.forEach((machine) => {
  //     const updated = data.find(
  //       (d: { machineName: string }) => d.machineName === machine.machineName
  //     );
  //     if (updated) machine.state = updated.state;
  //   });
  //   this.eyeDropsLineTwo.forEach((machine) => {
  //     const updated = data.find(
  //       (d: { machineName: string }) => d.machineName === machine.machineName
  //     );
  //     if (updated) machine.state = updated.state;
  //   });
  //   this.eyeDropsLineThree.forEach((machine) => {
  //     const updated = data.find(
  //       (d: { machineName: string }) => d.machineName === machine.machineName
  //     );
  //     if (updated) machine.state = updated.state;
  //   });
  //   const svg = document.getElementById('factory-svg');
  //   if (!svg) return;

  //   // Update individual machine rectangles
  //   machines.forEach((machine) => {
  //     const group = svg.querySelector(
  //       `[data-machine-name="${machine.machineName}"]`
  //     );
  //     if (!group) return;

  //     const rect = group.querySelector('rect');
  //     if (!rect) return;
  //     rect.classList.remove('pulse-green', 'pulse-red');
  //     const fillColor = machine.state === 1 ? '#28a745' : '#dc3545';
  //     rect.setAttribute('fill', fillColor);

  //     rect.classList.add(fillColor === '#28a745' ? 'pulse-green' : 'pulse-red');
  //   });

  //   const lineRect = svg.querySelector('[data-line-rect]') as SVGElement;
  //   if (lineRect) {
  //     const fillColor = this.getLineFillColor(this.eyeDrops);
  //     const pulseClass = this.getPulseClass(this.eyeDrops);

  //     // Remove existing classes
  //     lineRect.classList.remove('pulse-green', 'pulse-red');

  //     lineRect.setAttribute('fill', fillColor);
  //     lineRect.classList.add(pulseClass);
  //   }
  // }

  ngAfterViewInit() {
    const el = this.mySvg.nativeElement as HTMLElement;
    const svg = el.querySelector('svg');

    if (svg) {
      ['click', 'mousedown', 'mouseup', 'auxclick', 'contextmenu'].forEach(
        (evt) => {
          svg.addEventListener(evt, (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
          });
        }
      );

      svg.querySelectorAll('text').forEach((textEl: any) => {
        const currentSize = parseFloat(textEl.getAttribute('font-size')) || 12;
        textEl.setAttribute('font-size', (currentSize * 2).toString());
        textEl.setAttribute('font-weight', 'bold');
        textEl.setAttribute('fill', '#000');
      });

      svg.querySelectorAll('foreignObject, div, span').forEach((el: any) => {
        el.style.fontSize = '20px';
        el.style.fontWeight = 'bold';
        el.style.color = '#000';
      });

      svg.querySelectorAll('*').forEach((child: any) => {
        child.addEventListener('click', (e: Event) => {
          e.stopImmediatePropagation();
          e.preventDefault();
          return false;
        });
      });

      const background = svg.querySelector('rect');
      if (background) {
        background.style.pointerEvents = 'none';
      }

      const bgGroup = svg.querySelector('g');
      if (bgGroup && bgGroup.getAttribute('transform')?.includes('scale')) {
        bgGroup.style.pointerEvents = 'none';
      }
    }

    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  ngOnDestroy(): void {
    this._LayoutService.stopConnection();
  }
}
