import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-machine-copy-details',
  templateUrl: './machine-copy-details.component.html',
  styleUrls: ['./machine-copy-details.component.scss'],
})
export class MachineCopyDetailsComponent implements OnChanges {
  @Input() machines: any[] = [];
  @Input() filteredMachines: any[] = [];
  showDialog = false;
  dialogTitle = '';
  machinesState: any[] = [];
  flashingMachines = new Set<string>();
  flashingColor: Record<string, 'green' | 'red'> = {};
  offlineMachines = new Set<string>();
  private previousMachines: Record<string, { speed: number; count: number }> =
    {};
  private offlineTimers: Record<string, any> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['machines'] && this.machines?.length) {
      this.detectChangesAndFlash();
    }
  }

  detectChangesAndFlash(): void {
    this.machines.forEach((machine) => {
      const id = machine.machineName;
      const currentSpeed = machine.latestSignal?.speed ?? 0;

      this.offlineMachines.delete(id);

      if (this.offlineTimers[id]) {
        clearTimeout(this.offlineTimers[id]);
      }

      this.offlineTimers[id] = setTimeout(
        () => {
          this.offlineMachines.add(id);
        },
        15 * 60 * 1000,
      );

      const color = currentSpeed > 0 ? 'green' : 'red';
      this.triggerFlash(id, color);

      this.previousMachines[id] = {
        speed: currentSpeed,
        count: machine.totalCountDiff ?? 0,
      };
    });
  }

  triggerFlash(machineId: string, color: 'green' | 'red'): void {
    this.flashingMachines.add(machineId);
    this.flashingColor[machineId] = color;
    setTimeout(() => {
      this.flashingMachines.delete(machineId);
      delete this.flashingColor[machineId];
    }, 1500);
  }

  getMachineType(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes('forming')) return 'Forming';
    if (lower.includes('fill')) return 'Filling';
    if (lower.includes('labl')) return 'Label';
    if (lower.includes('blstr')) return 'Blister';
    if (lower.includes('shrink')) return 'Shrink';
    if (lower.includes('rins')) return 'Rinsing';
    if (lower.includes('capp')) return 'Capping';
    if (lower.includes('cart')) return 'Carton';
    return 'Machine';
  }
  ngOnDestroy(): void {
    Object.values(this.offlineTimers).forEach(clearTimeout);
  }
}
