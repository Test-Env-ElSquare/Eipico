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
  receivedData: any;
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
  updateMachinesData(machines: any[]) {
    const svg = document.getElementById('factory-svg');
    if (!svg) return;

    machines.forEach((machine) => {
      const group = svg.querySelector(
        `[data-machine-name="${machine.machineName}"]`
      );
      if (!group) {
        console.warn('Group not found for', machine.machineName);
        return;
      }

      const rect = group.querySelector('rect');
      if (!rect) return;

      const speed = machine.latest?.speed ?? 0;
      const count = machine.latest?.count ?? machine.totalCountDiff ?? 0;
      const state = machine.latest?.state ?? 0;

      const rectX = parseFloat(rect.getAttribute('x') || '0');
      const rectY = parseFloat(rect.getAttribute('y') || '0');
      const rectWidth = parseFloat(rect.getAttribute('width') || '0');
      const rectHeight = parseFloat(rect.getAttribute('height') || '0');

      const centerX = rectX + rectWidth / 2;
      const labelY = rectY + rectHeight / 2 + 6;
      const speedY = labelY - 25;
      const countY = labelY + 25;

      ['speed-overlay', 'count-overlay', 'state-indicator'].forEach((cls) => {
        const old = group.querySelector(`.${cls}`);
        if (old) old.remove();
      });

      // -------- SPEED --------
      const speedText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      speedText.setAttribute('x', `${centerX}`);
      speedText.setAttribute('y', `${speedY}`);
      speedText.setAttribute('text-anchor', 'middle');
      speedText.setAttribute('fill', 'dodgerblue');
      speedText.setAttribute('font-size', '20');
      speedText.setAttribute('font-family', 'Helvetica, Arial, sans-serif');
      speedText.setAttribute('font-weight', 'bold');
      speedText.classList.add('speed-overlay');
      speedText.textContent = `S: ${speed}`;
      group.appendChild(speedText);

      // -------- COUNT --------
      const countText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      countText.setAttribute('x', `${centerX}`);
      countText.setAttribute('y', `${countY}`);
      countText.setAttribute('text-anchor', 'middle');
      countText.setAttribute('fill', '#28a745');
      countText.setAttribute('font-size', '20');
      countText.setAttribute('font-family', 'Helvetica, Arial, sans-serif');
      countText.classList.add('count-overlay');
      countText.textContent = `C: ${count}`;
      group.appendChild(countText);

      // -------- STATE CIRCLE --------
      const circleX = rectX + rectWidth - 15;
      const circleY = rectY + 15;

      const stateCircle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      stateCircle.setAttribute('cx', `${circleX}`);
      stateCircle.setAttribute('cy', `${circleY}`);
      stateCircle.setAttribute('r', '8');
      stateCircle.setAttribute('stroke', 'black');
      stateCircle.setAttribute('stroke-width', '1');
      stateCircle.setAttribute('fill', state === 1 ? '#28a745' : '#dc3545');
      stateCircle.classList.add('state-indicator');
      group.appendChild(stateCircle);
    });
  }

  // private updateMachinesOnSvg(data: any[]) {
  //   const svg = this.mySvg.nativeElement.querySelector('svg');
  //   if (!svg || !Array.isArray(data)) return;

  //   data.forEach((machine) => {
  //     const name = machine.machineName?.trim();
  //     if (!name) return;

  //     const latest = machine.latest || {};
  //     const speed = latest.speed ?? 0;
  //     const count = latest.count ?? machine.totalCountDiff ?? 0;
  //     const stateValue = latest.state ?? 0;

  //     let color = '#cccccc';
  //     let stateText = 'Idle';
  //     if (stateValue === 1) {
  //       color = '#00ff00';
  //       stateText = 'Running';
  //     } else if (stateValue === 0) {
  //       color = '#ff0000';
  //       stateText = 'Stopped';
  //     }

  //     const group = svg.querySelector(`g[data-cell-id="${name}"]`);
  //     if (!group) {
  //       console.warn(`⚠️ لم يتم العثور على ${name} داخل SVG`);
  //       return;
  //     }

  //     const rect = group.querySelector('rect');
  //     if (rect) rect.setAttribute('fill', color);

  //     let x = 0,
  //       y = 0;
  //     if (rect) {
  //       x =
  //         parseFloat(rect.getAttribute('x')) +
  //         parseFloat(rect.getAttribute('width')) / 2;
  //       y =
  //         parseFloat(rect.getAttribute('y')) +
  //         parseFloat(rect.getAttribute('height')) / 2;
  //     } else {
  //       x = 1500;
  //       y = 1400;
  //     }

  //     group.querySelectorAll('.machine-info').forEach((el: any) => el.remove());

  //     const info = [
  //       `Speed: ${speed}`,
  //       `Count: ${count}`,
  //       `State: ${stateText}`,
  //     ];

  //     info.forEach((line, index) => {
  //       const textEl = document.createElementNS(
  //         'http://www.w3.org/2000/svg',
  //         'text'
  //       );
  //       textEl.setAttribute('class', 'machine-info');
  //       textEl.setAttribute('x', x.toString());

  //       textEl.setAttribute('y', (y + 25 + index * 20).toString());
  //       textEl.setAttribute('font-size', '14');
  //       textEl.setAttribute('text-anchor', 'middle');
  //       textEl.setAttribute('fill', '#000');
  //       textEl.textContent = line;
  //       group.appendChild(textEl);
  //     });
  //   });
  // }

  // control on fonts and disable go to link
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
