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
        { name: 'IMA 1', lineId: 28 },
        { name: 'Perry 2', lineId: 2 },
      ],
    },
    {
      label: 'Penam',
      machines: [{ name: 'Perry 1', lineId: 25 }],
    },
    {
      label: 'Dry Mix',
      machines: [
        { name: 'Ulman', lineId: 43 },
        { name: 'Dry Syrup', lineId: 42 },
        { name: 'Countec', lineId: 44 },
      ],
    },
    {
      label: 'Ampole',
      machines: [
        { name: 'IMA 3', lineId: 68 },
        { name: 'Thermoforming 2', lineId: 67 },
        { name: 'Ampole 1', lineId: 95 },
        { name: 'Ampole 2', lineId: 62 },
        { name: 'ROTA 5', lineId: 63 },
        { name: 'ROTA 4', lineId: 64 },
        { name: 'IMA 2', lineId: 65 },
        { name: 'IMA 4', lineId: 66 }, // ampole 6?
        { name: 'Combi', lineId: 60 },
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
        { name: 'Line 1 C80', lineId: 45 },
        { name: 'Line 2 C80', lineId: 46 },
        { name: 'TR200', lineId: 69 },
        { name: 'Ulman ubs4', lineId: 70 },
        { name: 'Zebler (Romaco)', lineId: 55 },
        { name: 'BQS', lineId: 56 },
        { name: 'Ulman800 (Ulman1)', lineId: 57 },
        { name: 'Ulman800 (Ulman2)', lineId: 58 },
        { name: 'Janson1', lineId: 70 },
        { name: 'Janson2', lineId: 70 },
        { name: 'Ulman300', lineId: 61 },
      ],
    },
    {
      label: 'Syrup',
      machines: [
        { name: 'Line 6 Drops', lineId: 36 },
        { name: 'Line 5 Vanhard', lineId: 34 },
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
          console.log('Received Data:', data);
          this.receivedData = data;
          this.updateMachinesData(data);
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
      const states: number[] = machines.map(
        (m: any) => m.latestSignal?.state ?? 0,
      );

      // Green  → at least one machine has state === 1
      // Pink   → all machines are state === 0  (stopped / alarm)
      // White  → no data yet
      let cssClass = 'white';
      if (machines.length > 0) {
        cssClass = states.some((s) => s === 1) ? 'green' : 'pink';
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
          'forming',
          'fill',
          'labl',
          'blstr',
          'shrink',
          'cart',
          'rins',
          'capp',
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
}
