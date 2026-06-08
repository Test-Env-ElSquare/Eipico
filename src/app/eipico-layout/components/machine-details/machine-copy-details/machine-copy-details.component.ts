import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
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
  timeRange: string = '';
  isChartLoading = false;
  hasChartData = false;

  showDialog = false;
  dialogTitle = '';
  machinesState: any[] = [];
  flashingMachines = new Set<string>();
  flashingColor: Record<string, 'green' | 'red'> = {};
  offlineMachines = new Set<string>();
  private previousMachines: Record<string, { speed: number; count: number }> =
    {};
  private offlineTimers: Record<string, any> = {};
  private chartRequestVersion = 0;

  constructor(private _machineService: MachinesService) {}

  private normalizeMachineTagsResponse(data: any): any[] {
    const responseData = data?.data ?? data;

    if (!Array.isArray(responseData)) {
      return [];
    }

    return responseData.reduce((items: any[], item: any) => {
      return items.concat(Array.isArray(item) ? item : [item]);
    }, []);
  }

  private resetChartState(showLoading = false): void {
    this.MachinetagsData = [];
    this.columName = '';
    this.count = 0;
    this.timeRange = '';
    this.hasChartData = false;
    this.isChartLoading = showLoading;

    const chartElement = document.getElementById('LayoutMachineChart');
    if (chartElement) {
      chartElement.innerHTML = '';
    }
  }

  private getDefaultTag(
    tags: MachineTagProperties[],
  ): MachineTagProperties | undefined {
    return (
      tags.find((tag) => tag.displayName?.trim().toLowerCase() === 'count') ??
      tags[0]
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      this.selectedMachineName = '';
    }
    if (changes['machines'] && this.machines?.length) {
      this.detectChangesAndFlash();
    }
  }

  selectMachine(machineName: string) {
    const requestVersion = ++this.chartRequestVersion;
    this.selectedMachineName = machineName;
    this.MachineTagPropertiesData = [];
    this.resetChartState(true);

    this._machineService
      .MachineTagProperties(machineName)
      .subscribe((data: any) => {
        if (requestVersion !== this.chartRequestVersion) {
          return;
        }

        this.MachineTagPropertiesData = data?.[0] ?? [];

        if (
          this.MachineTagPropertiesData &&
          this.MachineTagPropertiesData.length > 0
        ) {
          const defaultTag = this.getDefaultTag(this.MachineTagPropertiesData);
          if (defaultTag) {
            this.tagsChartBtn(
              defaultTag.columnName,
              defaultTag.chartType,
              defaultTag.displayName,
            );
          }
        } else {
          this.isChartLoading = false;
        }
      });
  }

  tagsChartBtn(columnName: any, chartType: string, displayName: string) {
    const requestVersion = ++this.chartRequestVersion;
    const machineName = this.selectedMachineName;

    this.columName = displayName;
    this.MachinetagsData = [];
    this.count = 0;
    this.hasChartData = false;
    this.isChartLoading = true;

    const chartElement = document.getElementById('LayoutMachineChart');
    if (chartElement) {
      chartElement.innerHTML = '';
    }

    const dates = this.getFormattedDates();
    const from = dates.from;
    const to = dates.to;

    // Format for display: From 2024-05-05 08:00 To 2024-05-05 12:00
    this.timeRange = `Data from ${from.replace('T', ' ')} to ${to.replace('T', ' ')}`;

    let type = 0; // Default: State
    if (displayName === 'Count') type = 1;
    if (displayName === 'Speed') type = 2;

    this._machineService.MachineTag(machineName, from, to, type).subscribe({
      next: (data: any) => {
        if (
          requestVersion !== this.chartRequestVersion ||
          machineName !== this.selectedMachineName
        ) {
          return;
        }

        this.MachinetagsData = this.normalizeMachineTagsResponse(data);

        if (!this.MachinetagsData.length) {
          this.isChartLoading = false;
          return;
        }

        const Category = this.MachinetagsData?.map((x) => {
          return new Date(x.timeStamp).toLocaleString();
        });

        this.hasChartData = true;

        if (displayName === 'State') {
          const state = this.MachinetagsData.map((x) => x.state);
          createLineChart({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: state,
            yAxistext: machineName,
            seriesname: displayName,
          });
        } else if (displayName === 'Count') {
          let sum = 0;
          this.MachinetagsData.forEach((x) => (sum += x.count || 0));
          this.count = sum;
          const counts = this.MachinetagsData.map((x) => x.count);
          createAreaSpline({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: counts,
            yAxistext: machineName,
            seriesname: displayName,
          });
        } else if (displayName === 'Speed') {
          const speed = this.MachinetagsData.map((x) => x.speed);
          createAreaSpline({
            id: 'LayoutMachineChart',
            xAxisCategories: Category,
            series: speed,
            yAxistext: machineName,
            seriesname: displayName,
          });
        }

        this.isChartLoading = false;
      },
      error: () => {
        if (requestVersion !== this.chartRequestVersion) {
          return;
        }

        this.isChartLoading = false;
        this.hasChartData = false;
      },
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
      to: format(now),
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

  ngOnDestroy(): void {
    Object.values(this.offlineTimers).forEach(clearTimeout);
  }
}
