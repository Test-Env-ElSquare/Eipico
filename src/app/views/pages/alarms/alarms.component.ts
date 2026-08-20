import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/core/services/app-Service.service';
import { Lines } from 'src/app/core/models/lines';
import { MachineService } from 'src/app/components/settings/services/machine.service';
import { Machine } from 'src/app/components/settings/models/model';
import {
  AlarmsService,
  StoppageAlarm,
  StoppageAlarmFilters,
} from './alarms.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit {
  activeTab: 'stoppage' | 'voltage' = 'stoppage';
  lines: Lines[] = [];
  machines: Machine[] = [];
  stoppageAlarms: StoppageAlarm[] = [];
  selectedAlarm: StoppageAlarm | null = null;
  isLoading = false;
  isMachinesLoading = false;
  isAcknowledgingId: number | null = null;
  errorMessage = '';

  filters: StoppageAlarmFilters = {
    lineId: 68,
    machineId: null,
    isActive: true,
    isAcknowledged: false,
    from: null,
    to: null,
  };

  get activeCount(): number {
    return this.stoppageAlarms.filter((alarm) => alarm.isActive).length;
  }

  get notAcknowledgedCount(): number {
    return this.stoppageAlarms.filter((alarm) => !alarm.isAcknowledged).length;
  }

  constructor(
    private alarmsService: AlarmsService,
    private appService: AppService,
    private machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.loadLines();
    this.loadMachines();
    this.loadStoppageAlarms();
  }

  loadLines(): void {
    this.appService.getAllLines().subscribe({
      next: (lines) => {
        this.lines = lines || [];
      },
      error: () => {
        this.lines = [];
      },
    });
  }

  loadMachines(): void {
    this.machines = [];
    this.filters.machineId = null;

    if (!this.filters.lineId) {
      return;
    }

    this.isMachinesLoading = true;
    this.machineService.GetLineMachines(this.filters.lineId)
      .pipe(finalize(() => this.isMachinesLoading = false))
      .subscribe({
        next: (machines) => {
          this.machines = machines || [];
        },
        error: () => {
          this.machines = [];
        },
      });
  }

  loadStoppageAlarms(): void {
    this.errorMessage = '';
    this.selectedAlarm = null;
    this.isLoading = true;

    this.alarmsService.getStoppageAlarms(this.filters)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (alarms) => {
          this.stoppageAlarms = alarms || [];
        },
        error: () => {
          this.stoppageAlarms = [];
          this.errorMessage = 'Failed to load stoppage alarms.';
        },
      });
  }

  onLineChange(): void {
    this.loadMachines();
    this.loadStoppageAlarms();
  }

  resetFilters(): void {
    this.filters = {
      lineId: 68,
      machineId: null,
      isActive: true,
      isAcknowledged: false,
      from: null,
      to: null,
    };
    this.loadMachines();
    this.loadStoppageAlarms();
  }

  viewAlarm(alarm: StoppageAlarm): void {
    this.alarmsService.getStoppageAlarmById(alarm.id).subscribe({
      next: (data) => {
        this.selectedAlarm = data;
      },
      error: () => {
        this.selectedAlarm = alarm;
      },
    });
  }

  acknowledge(alarm: StoppageAlarm): void {
    if (alarm.isAcknowledged || this.isAcknowledgingId) {
      return;
    }

    this.isAcknowledgingId = alarm.id;
    this.alarmsService.acknowledgeStoppageAlarm(alarm.id)
      .pipe(finalize(() => this.isAcknowledgingId = null))
      .subscribe({
        next: (updatedAlarm) => {
          this.stoppageAlarms = this.stoppageAlarms.map((item) =>
            item.id === updatedAlarm.id ? updatedAlarm : item
          );
          if (this.selectedAlarm?.id === updatedAlarm.id) {
            this.selectedAlarm = updatedAlarm;
          }
        },
        error: () => {
          this.errorMessage = 'Failed to acknowledge alarm.';
        },
      });
  }

  formatDuration(minutes: number | null | undefined): string {
    if (minutes === null || minutes === undefined) {
      return '-';
    }

    const totalMinutes = Math.round(minutes);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const mins = totalMinutes % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${mins}m`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }
}
