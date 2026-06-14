import {
  ChangeDetectorRef,
  Directive,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
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

interface ScaleStatus {
  scaleName: string;
  room: string;
  lastSignalTime: string | null;
}

interface DispensingRoom {
  name: string;
  scales: ScaleStatus[];
}

@Directive()
export abstract class EipicoFullscreenLayoutBase implements OnInit, OnDestroy {
  abstract factoryId: number;
  abstract title: string;
  abstract pageLabel: string;
  abstract exitLink: string;
  abstract productionSections: LayoutSection[];
  customProductionSectionGroups: LayoutSection[][] | null = null;
  dispensingRoomStartIndex = 0;
  dispensingRoomEndIndex = Number.MAX_SAFE_INTEGER;

  showDialog = false;
  dialogTitle = '';
  machines: any[] = [];
  currentOpenedLineId: string | null = null;
  receivedData: any[] = [];
  lineStats: Record<number, LineStats> = {};
  scaleStatusText = 'Connecting scales...';
  dispensingRooms: DispensingRoom[] = [];
  productionSectionGroups: LayoutSection[][] = [[], []];
  private scalesByRoomAndName: Record<string, ScaleStatus> = {};

  protected constructor(
    protected layoutService: LayoutService,
    protected router: Router,
    protected cdr: ChangeDetectorRef,
    protected ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.productionSectionGroups = this.buildProductionSectionGroups();
    this.onStartConnection();
  }

  ngOnDestroy(): void {
    this.layoutService.stopConnection();
    this.layoutService.stopScaleStatusConnection();
  }

  onStartConnection(): void {
    this.layoutService
      .startConnection()
      .then(() => {
        this.layoutService.onAllMachineUpdate((data: any[]) => {
          const receivedAt = performance.now();
          this.logSignalReceived(data, receivedAt);
          this.ngZone.run(() => {
            this.receivedData = data;
            this.updateMachinesData(data);
            this.cdr.detectChanges();
            this.logRenderDebug(data, receivedAt);
          });
        });

        this.layoutService.hubConnection.onreconnected(() => {
          this.layoutService.hubConnection.invoke(
            'JoinFactoryGroup',
            this.factoryId,
          );
        });

        return this.layoutService.hubConnection.invoke(
          'JoinFactoryGroup',
          this.factoryId,
        );
      })
      .then(() => {
        this.onStartScaleStatusConnection();
      })
      .catch((err) => console.error('SignalR error:', err));
  }

  onStartScaleStatusConnection(): void {
    this.layoutService
      .startScaleStatusConnection(this.factoryId)
      .then(() => {
        this.layoutService.onInitialScales((data: any[]) => {
          this.ngZone.run(() => {
            this.setScales(data);
            this.cdr.detectChanges();
          });
        });

        this.layoutService.onScaleUpdate((updated: any) => {
          this.ngZone.run(() => {
            this.upsertScale(updated);
            this.cdr.detectChanges();
          });
        });
      })
      .catch((err) => {
        this.scaleStatusText = 'Scale connection failed';
        console.error('Scale status SignalR error:', err);
      });
  }

  setScales(scales: any[]): void {
    this.scalesByRoomAndName = {};
    scales.forEach((scale) => this.upsertScale(scale, false));
    this.rebuildDispensingRooms();
  }

  upsertScale(scale: any, rebuild = true): void {
    if (!scale?.scaleName) {
      return;
    }

    const normalizedScale: ScaleStatus = {
      scaleName: scale.scaleName,
      room: scale.room || 'Unassigned Room',
      lastSignalTime: scale.lastSignalTime || null,
    };

    this.scalesByRoomAndName[this.getScaleKey(normalizedScale)] =
      normalizedScale;

    if (rebuild) {
      this.rebuildDispensingRooms();
    }
  }

  updateMachinesData(lines: any[]): void {
    this.receivedData = lines;

    if (this.showDialog && this.currentOpenedLineId) {
      this.goToMachineDetails(this.currentOpenedLineId);
    }

    lines.forEach((line: any) => {
      const machines: any[] = line.machines || [];
      const speeds: number[] = machines.map(
        (m: any) => m.latestSignal?.speed ?? 0,
      );

      let cssClass = 'white';
      if (machines.length > 0) {
        cssClass = speeds.some((speed: number) => speed > 0)
          ? 'green'
          : 'pink';
      }

      const lastTimestamp =
        machines[machines.length - 1]?.latestTimeStamp ?? '';

      this.lineStats[line.lineId] = {
        machineCount: line.machineCount ?? 0,
        lastUpdate: this.formatDateTime(lastTimestamp),
        cssClass,
        isRunning: cssClass === 'green',
        machines: this.sortMachines(machines),
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

  getMachineCountValue(machine: any): string {
    const count =
      machine.latestSignal?.count ??
      machine.latestSignal?.counter ??
      machine.latestSignal?.productionCount ??
      machine.count ??
      machine.counter ??
      machine.productionCount;

    return count === undefined || count === null
      ? '-'
      : Math.round(Number(count)).toString();
  }

  getScaleStatusLabel(scale: ScaleStatus): string {
    return scale.lastSignalTime ? 'Live' : 'No signal';
  }

  getScaleLastSignal(scale: ScaleStatus): string {
    return scale.lastSignalTime ? this.formatDateTime(scale.lastSignalTime) : '-';
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
    const rooms = this.getPageDispensingRooms();
    const splitIndex = Math.ceil(rooms.length / 2);

    return rooms.slice(0, splitIndex);
  }

  getSecondDispensingRooms(): any[] {
    const rooms = this.getPageDispensingRooms();
    const splitIndex = Math.ceil(rooms.length / 2);

    return rooms.slice(splitIndex);
  }

  private getPageDispensingRooms(): any[] {
    return this.dispensingRooms.slice(
      this.dispensingRoomStartIndex,
      this.dispensingRoomEndIndex,
    );
  }

  private rebuildDispensingRooms(): void {
    const rooms = new Map<string, ScaleStatus[]>();

    Object.values(this.scalesByRoomAndName).forEach((scale) => {
      if (!rooms.has(scale.room)) {
        rooms.set(scale.room, []);
      }

      rooms.get(scale.room)?.push(scale);
    });

    this.dispensingRooms = Array.from(rooms.entries())
      .map(([name, scales]) => ({
        name,
        scales: scales.sort((a, b) => a.scaleName.localeCompare(b.scaleName)),
      }))
      .sort((a, b) => this.compareRoomNames(a.name, b.name));

    this.scaleStatusText = this.dispensingRooms.length
      ? ''
      : 'No scales found';
  }

  private compareRoomNames(first: string, second: string): number {
    const firstNumber = this.getFirstNumber(first);
    const secondNumber = this.getFirstNumber(second);

    if (firstNumber !== null && secondNumber !== null) {
      return firstNumber - secondNumber;
    }

    return first.localeCompare(second);
  }

  private getFirstNumber(value: string): number | null {
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  private getScaleKey(scale: ScaleStatus): string {
    return `${scale.room}::${scale.scaleName}`;
  }

  getProductionSectionGroups(): LayoutSection[][] {
    return this.productionSectionGroups;
  }

  private buildProductionSectionGroups(): LayoutSection[][] {
    if (this.customProductionSectionGroups) {
      return this.customProductionSectionGroups;
    }

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

  private logSignalReceived(data: any[], receivedAtMs: number): void {
    const now = new Date();
    console.log(
      `[SignalR][Fullscreen][Factory ${this.factoryId}][${this.pageLabel}] ReceiveFactorySignals`,
      {
        receivedAt: now.toISOString(),
        localTime: now.toLocaleTimeString(),
        performanceMs: Math.round(receivedAtMs),
        lineCount: Array.isArray(data) ? data.length : 0,
        firstLineId: Array.isArray(data) ? data[0]?.lineId : undefined,
      },
    );
    this.logIma2Speed(data, now);
  }

  private logRenderDebug(data: any[], receivedAtMs: number): void {
    const ima2Line = this.findIma2Line(data);
    const lineId = ima2Line?.signalLine?.lineId;

    requestAnimationFrame(() => {
      const frameAtMs = performance.now();
      const lineButton = lineId
        ? document.querySelector(`[data-line-id="${lineId}"]`)
        : null;

      console.log(
        `[RenderDebug][Fullscreen][Factory ${this.factoryId}][${this.pageLabel}] After detectChanges`,
        {
          elapsedMs: Math.round(frameAtMs - receivedAtMs),
          ima2Found: Boolean(ima2Line),
          lineId,
          lineName: ima2Line?.layoutLine?.name,
          speeds: ima2Line?.speeds,
          maxSpeed: ima2Line?.maxSpeed,
          lineCssClass: lineId ? this.getCssClass(lineId) : undefined,
          domFound: Boolean(lineButton),
          domClasses: lineButton?.getAttribute('class'),
          domText: lineButton?.textContent?.trim().slice(0, 160),
        },
      );
    });
  }

  private logIma2Speed(data: any[], receivedAt: Date): void {
    if (!Array.isArray(data)) {
      return;
    }

    data.forEach((line) => {
      const layoutLine = this.findIma2LayoutLine(line.lineId);

      if (!layoutLine) {
        return;
      }

      const speeds = (line.machines || []).map(
        (machine: any) => machine.latestSignal?.speed ?? 0,
      );

      console.log(
        `[SignalR][Fullscreen][Factory ${this.factoryId}][${this.pageLabel}] IMA 2 Line Speeds`,
        {
          receivedAt: receivedAt.toISOString(),
          localTime: receivedAt.toLocaleTimeString(),
          lineId: line.lineId,
          lineName: layoutLine.name,
          speeds,
          maxSpeed: speeds.length ? Math.max(...speeds) : 0,
          machineNames: (line.machines || []).map(
            (machine: any) => machine.machineName,
          ),
        },
      );
    });
  }

  private findIma2Line(data: any[]): any | null {
    if (!Array.isArray(data)) {
      return null;
    }

    for (const signalLine of data) {
      const layoutLine = this.findIma2LayoutLine(signalLine.lineId);

      if (layoutLine) {
        const speeds = (signalLine.machines || []).map(
          (machine: any) => machine.latestSignal?.speed ?? 0,
        );

        return {
          signalLine,
          layoutLine,
          speeds,
          maxSpeed: speeds.length ? Math.max(...speeds) : 0,
        };
      }
    }

    return null;
  }

  private findIma2LayoutLine(lineId: number): LayoutLine | undefined {
    for (const section of this.productionSections) {
      const found = section.machines.find(
        (line) => line.lineId === lineId && this.isIma2Name(line.name),
      );

      if (found) {
        return found;
      }
    }

    return undefined;
  }

  private isIma2Name(name: string): boolean {
    return (name || '').toLowerCase().replace(/[^a-z0-9]/g, '') === 'ima2';
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
