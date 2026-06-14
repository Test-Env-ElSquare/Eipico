import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-one-copy',
  templateUrl: './layout-one-copy.component.html',
  styleUrls: ['./layout-one-copy.component.scss'],
})
export class LayoutOneCopyComponent implements OnInit {
  constructor(
    private _LayoutService: LayoutService,
    private _router: Router,
  ) {}

  // ── Lifecycle ─────────────────────────────────────────────
  ngOnInit(): void {
    this.onStartConnection();
  }
  // ── Dialog ────────────────────────────────────────────────
  showDialog = false;
  dialogTitle = '';
  flashingLines = new Set<number>();
  machines: any[] = [];
  currentOpenedLineId: string | null = null;

  // ── SignalR raw data ──────────────────────────────────────
  receivedData: any[] = [];

  /**
   * lineStats: keyed by lineId (number)
   * Holds everything the template needs per production line.
   */
  lineStats: Record<
    number,
    {
      machineCount: number;
      lastUpdate: string;
      cssClass: string; // 'green' | 'pink' | 'white'
    }
  > = {};

  // ── Static: Dispensing rooms ──────────────────────────────
  dispensingRooms = [
    { name: 'Room1', scales: ['Scales: 1', 'Scales: 2', 'Scales: 3'] },
    { name: 'Room2', scales: ['Scales: 1', 'Scales: 2', 'Scales: 3'] },
    { name: 'Room3', scales: ['Scales: 1', 'Scales: 2', 'Scales: 3'] },
    { name: 'Room4', scales: ['Scales: 1', 'Scales: 2', 'Scales: 3'] },
    { name: 'Room5', scales: ['Scales: 1', 'Scales: 2', 'Scales: 3'] },
  ];

  /**
   * Production sections definition.
   * `lineId` must match the back-end lineId coming from SignalR.
   * Adjust lineIds below to match your actual back-end values.
   */
  productionSections = [
    {
      label: 'Penam',
      machines: [{ name: 'IMA 2', lineId: 26 }],
    },
    {
      label: 'Cephalo',
      machines: [
        { name: 'Perry 2', lineId: 28 },
        { name: 'IMA 1', lineId: 2 },
      ],
    },
    {
      label: 'Beta_Lactal (strile)',
      machines: [{ name: 'Perry 1', lineId: 25 }],
    },
    {
      label: 'Dry Mix',
      machines: [
        { name: 'Ulman 300', lineId: 43 },
        { name: 'Dry Syrup', lineId: 42 },
        { name: 'Countec', lineId: 44 },
        { name: 'Ulman (Standalone)', lineId: 72 },
      ],
    },
    {
      label: 'Ampole',
      machines: [
        { name: 'IMA 3', lineId: 68 },
        // { name: 'Thermoforming 2', lineId: 67 },
        // { name: 'Ampole 1', lineId: 95 },
        { name: 'ROTA 7', lineId: 62 },
        { name: 'ROTA 5', lineId: 63 },
        { name: 'ROTA 4', lineId: 64 },
        { name: 'IMA 2', lineId: 65 },
        { name: 'IMA 4', lineId: 66 },
        { name: 'ROTA 6', lineId: 67 },
      ],
    },
    {
      label: 'Drops',
      machines: [
        { name: 'Eye Drops 1', lineId: 24 },
        { name: 'Eye Drops 2', lineId: 20 },
        { name: 'Eye Drops 3', lineId: 23 },
      ],
    },
    {
      label: 'Tablet',
      machines: [
        { name: ' C80_1', lineId: 45 },
        { name: 'C80_2', lineId: 46 },
        { name: 'TR200', lineId: 69 },
        { name: 'Ulman ubs4', lineId: 54 },
        { name: 'Zebler (Romaco)', lineId: 55 },
        { name: 'BQS', lineId: 56 },
        { name: 'Ulman800 (Ulman1)', lineId: 57 },
        { name: 'Ulman800 (Ulman2)', lineId: 58 },
        { name: 'Janson1', lineId: 59 },
        { name: 'Janson2', lineId: 60 },
        { name: 'Ulman300', lineId: 61 },
      ],
    },
    {
      label: 'Syrup',
      machines: [
        { name: 'Line 6 Drops', lineId: 36 },
        { name: 'Line 5 Vangard', lineId: 34 },
        { name: 'Line 4 ss4', lineId: 33 },
        { name: 'Line 3 Bocsh', lineId: 3 },
        { name: 'Line 2 ss new', lineId: 40 },
        { name: 'Line 1 ss3', lineId: 38 },
      ],
    },
    {
      label: 'Ointment',
      machines: [
        { name: 'Line AXO', lineId: 32 },
        { name: 'Line COM', lineId: 41 },
        { name: 'Line IMA', lineId: 37 },
        { name: 'Line Supp', lineId: 27 },
      ],
    },
  ];

  // ── Lifecycle ─────────────────────────────────────────────

  ngOnDestroy(): void {
    this._LayoutService.stopConnection();
  }

  // ── SignalR ───────────────────────────────────────────────
  onStartConnection(): void {
    this._LayoutService
      .startConnection()
      .then(() => {
        console.log('Connected to SignalR Hub');
        this._LayoutService.onAllMachineUpdate((data: any[]) => {
          const receivedAt = performance.now();
          this.logSignalReceived(data, 2);
          this.receivedData = data;
          this.updateMachinesData(data);
          this.logRenderDebug(data, 2, receivedAt);
        });
        const factoryId = 2;
        return this._LayoutService.hubConnection.invoke(
          'JoinFactoryGroup',
          factoryId,
        );
      })
      .then(() => console.log('Joined Factory Group'))
      .catch((err) => console.error('SignalR error:', err));
  }

  /**
   * Rebuilds `lineStats` from the latest SignalR push.
   * Also refreshes the open dialog if any.
   */
  updateMachinesData(lines: any[]): void {
    this.receivedData = lines;

    // Refresh open dialog live
    if (this.showDialog && this.currentOpenedLineId) {
      this.goToMachineDetails(this.currentOpenedLineId);
    }

    lines.forEach((line: any) => {
      const machines: any[] = line.machines || [];
      const speeds: number[] = machines.map(
        (m: any) => m.latestSignal?.speed ?? 0,
      );

      // Green  → at least one machine has state === 1
      // Pink   → all machines are state === 0  (stopped / alarm)
      // White  → no data yet
      let cssClass = 'white';
      if (machines.length > 0) {
        cssClass = speeds.some((s) => s > 0) ? 'green' : 'pink';
      }

      const lastTimestamp =
        machines[machines.length - 1]?.latestTimeStamp ?? '';

      this.lineStats[line.lineId] = {
        machineCount: line.machineCount ?? 0,
        lastUpdate: this.formatDateTime(lastTimestamp),
        cssClass,
      };
    });
  }

  // ── Dialog ────────────────────────────────────────────────
  goToMachineDetails(lineId: string | null): void {
    if (!lineId) {
      this.machines = [];
      this.showDialog = false;
      return;
    }

    this.currentOpenedLineId = lineId;

    if (Array.isArray(this.receivedData) && this.receivedData.length > 0) {
      const selectedLine = this.receivedData.find((l) => l.lineId == lineId);

      if (selectedLine) {
        // Keep only machines whose name matches known type keywords, sorted by process order
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

        const validMachines = selectedLine.machines.filter(
          (m: { machineName: string }) =>
            order.some((key) => m.machineName.toLowerCase().includes(key)),
        );

        this.machines = validMachines.sort(
          (a: { machineName: string }, b: { machineName: string }) => {
            const aIdx = order.findIndex((k) =>
              a.machineName.toLowerCase().includes(k),
            );
            const bIdx = order.findIndex((k) =>
              b.machineName.toLowerCase().includes(k),
            );
            return (
              (aIdx === -1 ? order.length : aIdx) -
              (bIdx === -1 ? order.length : bIdx)
            );
          },
        );

        // Dialog title = section label
        const section = this.productionSections.find((s) =>
          s.machines.some((m) => m.lineId === +lineId),
        );
        this.dialogTitle = section
          ? `${section.label} — ${this.getLineName(+lineId)}`
          : 'Machine Details';
      } else {
        this.machines = [];
      }
    } else {
      this.machines = [];
    }

    this.showDialog = true;
  }

  // ── Template helpers ──────────────────────────────────────

  /** CSS class (green / pink / white) for a machine row */
  getCssClass(lineId: number): string {
    return this.lineStats[lineId]?.cssClass ?? 'white';
  }

  /** "Machines: X" text */
  getMachineCount(lineId: number): string {
    const count = this.lineStats[lineId]?.machineCount;
    return count !== undefined ? `Machines: ${count}` : '';
  }

  /** Formatted last-update timestamp */
  getLastUpdate(lineId: number): string {
    return this.lineStats[lineId]?.lastUpdate ?? '';
  }

  /** Returns the display name for a lineId from productionSections */
  getLineName(lineId: number): string {
    for (const section of this.productionSections) {
      const found = section.machines.find((m) => m.lineId === lineId);
      if (found) return found.name;
    }
    return '';
  }

  formatDateTime(value: string | Date): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  private logSignalReceived(data: any[], factoryId: number): void {
    const now = new Date();
    console.log(
      `[SignalR][Old Layout][Factory ${factoryId}][Eipico 1 Old Layout] ReceiveFactorySignals`,
      {
        receivedAt: now.toISOString(),
        localTime: now.toLocaleTimeString(),
        lineCount: Array.isArray(data) ? data.length : 0,
        firstLineId: Array.isArray(data) ? data[0]?.lineId : undefined,
      },
    );
    this.logIma2Speed(data, factoryId, now);
  }

  private logIma2Speed(data: any[], factoryId: number, receivedAt: Date): void {
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
        `[SignalR][Old Layout][Factory ${factoryId}][Eipico 1 Old Layout] IMA 2 Line Speeds`,
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

  private logRenderDebug(
    data: any[],
    factoryId: number,
    receivedAtMs: number,
  ): void {
    const ima2Line = this.findIma2Line(data);
    const lineId = ima2Line?.signalLine?.lineId;

    requestAnimationFrame(() => {
      const frameAtMs = performance.now();
      console.log(
        `[RenderDebug][Old Layout][Factory ${factoryId}][Eipico 1 Old Layout] After updateMachinesData`,
        {
          elapsedMs: Math.round(frameAtMs - receivedAtMs),
          ima2Found: Boolean(ima2Line),
          lineId,
          lineName: ima2Line?.layoutLine?.name,
          speeds: ima2Line?.speeds,
          maxSpeed: ima2Line?.maxSpeed,
          lineCssClass: lineId ? this.getCssClass(lineId) : undefined,
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

  private findIma2LayoutLine(lineId: number): any | undefined {
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
}
