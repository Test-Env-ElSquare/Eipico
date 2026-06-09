import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout.service';
import { LayoutLine, LayoutSection } from './eipico-layout-data';

interface LineStats {
  machineCount: number;
  lastUpdate: string;
  cssClass: string;
  isRunning: boolean;
  machines: any[];
}

@Directive()
export abstract class EipicoFullscreenLayoutBase implements OnInit, OnDestroy {
  abstract factoryId: number;
  abstract title: string;
  abstract pageLabel: string;
  abstract exitLink: string;
  abstract productionSections: LayoutSection[];

  showDialog = false;
  dialogTitle = '';
  machines: any[] = [];
  currentOpenedLineId: string | null = null;
  receivedData: any[] = [];
  lineStats: Record<number, LineStats> = {};

  dispensingRooms = [
    { name: 'Room 1', scales: ['Scale 1', 'Scale 2', 'Scale 3'] },
    { name: 'Room 2', scales: ['Scale 1', 'Scale 2', 'Scale 3'] },
    { name: 'Room 3', scales: ['Scale 1', 'Scale 2', 'Scale 3'] },
    { name: 'Room 4', scales: ['Scale 1', 'Scale 2', 'Scale 3'] },
    { name: 'Room 5', scales: ['Scale 1', 'Scale 2', 'Scale 3'] },
  ];

  protected constructor(
    protected layoutService: LayoutService,
    protected router: Router,
  ) {}

  ngOnInit(): void {
    this.onStartConnection();
  }

  ngOnDestroy(): void {
    this.layoutService.stopConnection();
  }

  onStartConnection(): void {
    this.layoutService
      .startConnection()
      .then(() => {
        this.layoutService.onAllMachineUpdate((data: any[]) => {
          this.receivedData = data;
          this.updateMachinesData(data);
        });

        return this.layoutService.hubConnection.invoke(
          'JoinFactoryGroup',
          this.factoryId,
        );
      })
      .catch((err) => console.error('SignalR error:', err));
  }

  updateMachinesData(lines: any[]): void {
    this.receivedData = lines;

    if (this.showDialog && this.currentOpenedLineId) {
      this.goToMachineDetails(this.currentOpenedLineId);
    }

    lines.forEach((line: any) => {
      const machines = this.sortMachines(line.machines || []);
      const speeds = machines.map((m: any) => m.latestSignal?.speed ?? 0);
      const cssClass = machines.length
        ? speeds.some((speed: number) => speed > 0)
          ? 'green'
          : 'pink'
        : 'white';
      const lastTimestamp =
        machines[machines.length - 1]?.latestTimeStamp ?? '';

      this.lineStats[line.lineId] = {
        machineCount: line.machineCount ?? machines.length,
        lastUpdate: this.formatDateTime(lastTimestamp),
        cssClass,
        isRunning: cssClass === 'green',
        machines,
      };
    });
  }

  goToMachineDetails(lineId: string | null): void {
    if (!lineId) {
      this.machines = [];
      this.showDialog = false;
      return;
    }

    this.currentOpenedLineId = lineId;
    this.machines = this.getLineMachines(+lineId);
    this.dialogTitle = `${this.getSectionName(+lineId)} - ${this.getLineName(
      +lineId,
    )}`;
    this.showDialog = true;
  }

  exitFullscreen(): void {
    this.router.navigate([this.exitLink]);
  }

  getCssClass(lineId: number): string {
    return this.lineStats[lineId]?.cssClass ?? 'white';
  }

  getMachineCount(lineId: number): string {
    const count = this.lineStats[lineId]?.machineCount;
    return count !== undefined ? `${count} Machines` : 'No data';
  }

  getLastUpdate(lineId: number): string {
    return this.lineStats[lineId]?.lastUpdate ?? '';
  }

  isLineRunning(lineId: number): boolean {
    return this.lineStats[lineId]?.isRunning ?? false;
  }

  getLineStatusText(lineId: number): string {
    if (!this.lineStats[lineId]) {
      return 'NO DATA';
    }

    return this.isLineRunning(lineId) ? 'ON' : 'OFF';
  }

  getLineMachines(lineId: number): any[] {
    return this.lineStats[lineId]?.machines ?? [];
  }

  getMachineStatusClass(machine: any): string {
    return (machine.latestSignal?.speed ?? 0) > 0 ? 'running' : 'stopped';
  }

  isMachineRunning(machine: any): boolean {
    return this.getMachineStatusClass(machine) === 'running';
  }

  getMachineSpeed(machine: any): string {
    const speed = machine.latestSignal?.speed;
    return speed === undefined || speed === null ? '-' : Math.round(speed).toString();
  }

  getMachineType(name: string): string {
    const lower = (name || '').toLowerCase();
    if (lower.includes('rins')) return 'Rinsing';
    if (lower.includes('forming')) return 'Forming';
    if (lower.includes('fill')) return 'Filling';
    if (lower.includes('blstr')) return 'Blister';
    if (lower.includes('capp')) return 'Capping';
    if (lower.includes('labl')) return 'Label';
    if (lower.includes('cart')) return 'Carton';
    if (lower.includes('shrink')) return 'Shrink';
    return 'Machine';
  }

  getFirstDispensingRooms(): any[] {
    return this.dispensingRooms.slice(0, 2);
  }

  getSecondDispensingRooms(): any[] {
    return this.dispensingRooms.slice(2);
  }

  getProductionSectionGroups(): LayoutSection[][] {
    if (this.productionSections.length <= 1) {
      return [this.productionSections, []];
    }

    const totalLines = this.productionSections.reduce(
      (total, section) => total + section.machines.length,
      0,
    );
    let leftLines = 0;
    let splitIndex = 1;
    let bestDiff = Number.MAX_SAFE_INTEGER;

    for (let index = 0; index < this.productionSections.length - 1; index++) {
      leftLines += this.productionSections[index].machines.length;

      const rightLines = totalLines - leftLines;
      const diff = Math.abs(leftLines - rightLines);

      if (diff < bestDiff) {
        bestDiff = diff;
        splitIndex = index + 1;
      }
    }

    return [
      this.productionSections.slice(0, splitIndex),
      this.productionSections.slice(splitIndex),
    ];
  }

  getLineName(lineId: number): string {
    for (const section of this.productionSections) {
      const found = section.machines.find((line: LayoutLine) => line.lineId === lineId);
      if (found) {
        return found.name;
      }
    }

    return 'Line';
  }

  private getSectionName(lineId: number): string {
    const section = this.productionSections.find((item) =>
      item.machines.some((line) => line.lineId === lineId),
    );

    return section?.label ?? 'Machine Details';
  }

  private sortMachines(machines: any[]): any[] {
    const order = [
      'rins',
      'forming',
      'fill',
      'blstr',
      'capp',
      'labl',
      'cart',
      'shrink',
    ];

    return [...machines].sort((a: any, b: any) => {
      const aName = (a.machineName || '').toLowerCase();
      const bName = (b.machineName || '').toLowerCase();
      const aIdx = order.findIndex((key) => aName.includes(key));
      const bIdx = order.findIndex((key) => bName.includes(key));

      return (
        (aIdx === -1 ? order.length : aIdx) -
        (bIdx === -1 ? order.length : bIdx)
      );
    });
  }

  formatDateTime(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
