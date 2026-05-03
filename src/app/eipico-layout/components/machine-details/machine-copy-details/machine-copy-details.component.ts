import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MachinesService } from '../../../../components/machines/services/machines.service';
import {
  createAreaSpline,
  createLineChart,
} from 'src/app/core/chartModel/HChart';
import { MachineTagProperties } from '../../../../components/machines/models/machineStatemodel';

@Component({
  selector: 'app-machine-copy-details',
  templateUrl: './machine-copy-details.component.html',
  styleUrls: ['./machine-copy-details.component.scss'],
})
export class MachineCopyDetailsComponent implements OnChanges, OnDestroy {
  @Input() machines: any[] = [];
  @Input() filteredMachines: any[] = [];
  @Input() isVisible: boolean = false;
  
  // Graph related properties
  selectedMachineName: string = '';
  MachineTagPropertiesData: MachineTagProperties[] = [];
  MachinetagsData: any[] = [];
  columName: string = '';
  count: number = 0;

  showDialog = false;
  dialogTitle = '';
  machinesState: any[] = [];
  flashingMachines = new Set<string>();
  flashingColor: Record<string, 'green' | 'red'> = {};
  offlineMachines = new Set<string>();
  private previousMachines: Record<string, { speed: number; count: number }> =
    {};
  private offlineTimers: Record<string, any> = {};

  constructor(private _machineService: MachinesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      this.selectedMachineName = '';
    }
    if (changes['machines'] && this.machines?.length) {
      this.detectChangesAndFlash();
    }
  }

  selectMachine(machineName: string) {
    this.selectedMachineName = machineName;
    this._machineService.MachineTagProperties(machineName).subscribe((data: any) => {
      this.MachineTagPropertiesData = data[0];
      // Auto load the first tag graph if available
      if (this.MachineTagPropertiesData && this.MachineTagPropertiesData.length > 0) {
        const firstTag = this.MachineTagPropertiesData[0];
        this.tagsChartBtn(firstTag.columnName, firstTag.chartType, firstTag.displayName);
      }
    });
  }

  tagsChartBtn(
    columnName: any,
    chartType: string,
    displayName: string
  ) {
    this.columName = displayName;
    const dates = this.getFormattedDates();
    const from = dates.from;
    const to = dates.to;

    let type = 0; // Default: State
    if (displayName === 'Count') type = 1;
    if (displayName === 'Speed') type = 2;

    this._machineService
      .MachineTag(this.selectedMachineName, from, to, type)
      .subscribe((data: any) => {
        if (data) {
          this.MachinetagsData = data;
        }
        
        const Category = this.MachinetagsData?.map((x) => {
          return new Date(x.timeStamp).toLocaleString();
        });

        if (displayName === 'State') {
          const state = this.MachinetagsData.map((x) => x.state);
          createLineChart({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: state,
            yAxistext: this.selectedMachineName,
            seriesname: displayName,
          });
        } else if (displayName === 'Count') {
          let sum = 0;
          this.MachinetagsData.forEach(x => sum += (x.count || 0));
          this.count = sum;
          const counts = this.MachinetagsData.map((x) => x.count);
          createAreaSpline({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: counts,
            yAxistext: this.selectedMachineName,
            seriesname: displayName,
          });
        } else if (displayName === 'Speed') {
          const speed = this.MachinetagsData.map((x) => x.speed);
          createAreaSpline({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: speed,
            yAxistext: this.selectedMachineName,
            seriesname: displayName,
          });
        }
      });
  }

  getFormattedDates() {
    const now = new Date();
    const from = new Date();
    from.setHours(8, 0, 0, 0);
    
    if (now < from) {
      from.setDate(from.getDate() - 1);
    }

    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const format = (d: Date) => 
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    
    return {
      from: format(from),
      to: format(now)
    };
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
