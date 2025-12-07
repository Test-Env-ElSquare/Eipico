// becon-report.component.ts
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ReportsService } from '../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { MachineState } from 'src/app/components/machines/models/machineStatemodel';
import { MachinesService } from 'src/app/components/machines/services/machines.service';
import { EnergyMachineState } from '../../model/model';

@Component({
  selector: 'app-becon-report',
  templateUrl: './becon-report.component.html',
  styleUrls: ['./becon-report.component.scss'],
  animations: [
    trigger('collapse', [
      state('expanded', style({ maxHeight: '1000px', padding: '*' })),
      state('collapsed', style({ maxHeight: '0', padding: '0' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class BeconReportComponent implements OnInit {
  // Expose Math to template
  protected Math = Math;

  showProduction = true;
  showUtilities = false;

  searchProduction = '';
  searchUtilities = '';

  MachineProduction: MachineState[] = [];
  MachineUtilites: EnergyMachineState[] = [];
  filteredProductionMachines: MachineState[] = [];
  filteredUtilitiesMachines: EnergyMachineState[] = [];

  totalBecons = 0;
  totalActive = 0;
  totalInactive = 0;
  totalBeconsU = 0;
  totalActiveU = 0;
  totalInactiveU = 0;
  lastUpdated = new Date();

  // Pagination for Production
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  // Pagination for Utilities
  currentPageUtilities = 1;
  itemsPerPageUtilities = 5;
  totalPagesUtilities = 1;

  // Sorting
  sortProductionField: keyof MachineState = 'machineName';
  sortProductionDirection: 'asc' | 'desc' = 'asc';
  sortUtilitiesField: keyof EnergyMachineState = 'name';
  sortUtilitiesDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private _reportService: ReportsService,
    private _machineService: MachinesService
  ) {}

  ngOnInit(): void {
    this.GetBykonState();
    this.GetEnergyMachineState();
  }

  toggleProduction() {
    this.showProduction = !this.showProduction;
  }

  toggleUtilities() {
    this.showUtilities = !this.showUtilities;
  }

  // === Production Methods ===

  filterProduction() {
    this.filteredProductionMachines = this.MachineProduction.filter((machine) =>
      machine.machineName
        .toLowerCase()
        .includes(this.searchProduction.toLowerCase())
    );
    this.sortProduction(this.sortProductionField);
    this.updatePagination();
  }

  // get paginatedProductionMachines(): MachineState[] {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   return this.filteredProductionMachines.slice(start, end);
  // }

  sortProduction(field: keyof MachineState) {
    if (this.sortProductionField === field) {
      this.sortProductionDirection =
        this.sortProductionDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortProductionField = field;
      this.sortProductionDirection = 'asc';
    }

    this.filteredProductionMachines.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (valA < valB) return this.sortProductionDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortProductionDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  getSortIcon(field: string): string {
    if (
      field === this.sortProductionField ||
      field === this.sortUtilitiesField
    ) {
      return this.sortProductionDirection === 'asc' ||
        this.sortUtilitiesDirection === 'asc'
        ? 'arrow_upward'
        : 'arrow_downward';
    }
    return 'swap_vert';
  }

  // Pagination for Production
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(this.currentPage - half, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(
      this.filteredProductionMachines.length / this.itemsPerPage
    );
    this.currentPage = 1;
  }

  getEndItem(): number {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredProductionMachines.length
    );
  }

  // === Utilities Methods ===

  filterUtilities() {
    this.filteredUtilitiesMachines = this.MachineUtilites.filter((machine) =>
      machine.name.toLowerCase().includes(this.searchUtilities.toLowerCase())
    );
    this.sortUtilities(this.sortUtilitiesField);
    this.updatePaginationUtilities();
  }

  // get paginatedUtilitiesMachines(): EnergyMachineState[] {
  //   const start = (this.currentPageUtilities - 1) * this.itemsPerPageUtilities;
  //   const end = start + this.itemsPerPageUtilities;
  //   return this.filteredUtilitiesMachines.slice(start, end);
  // }

  sortUtilities(field: keyof EnergyMachineState) {
    if (this.sortUtilitiesField === field) {
      this.sortUtilitiesDirection =
        this.sortUtilitiesDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortUtilitiesField = field;
      this.sortUtilitiesDirection = 'asc';
    }

    this.filteredUtilitiesMachines.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (valA < valB) return this.sortUtilitiesDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortUtilitiesDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePaginationUtilities();
  }

  // Pagination for Utilities
  goToPageUtilities(page: number): void {
    if (page >= 1 && page <= this.totalPagesUtilities) {
      this.currentPageUtilities = page;
    }
  }

  previousPageUtilities(): void {
    if (this.currentPageUtilities > 1) {
      this.currentPageUtilities--;
    }
  }

  nextPageUtilities(): void {
    if (this.currentPageUtilities < this.totalPagesUtilities) {
      this.currentPageUtilities++;
    }
  }

  getPageNumbersUtilities(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(this.currentPageUtilities - half, 1);
    let endPage = Math.min(
      startPage + maxPagesToShow - 1,
      this.totalPagesUtilities
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  private updatePaginationUtilities(): void {
    this.totalPagesUtilities = Math.ceil(
      this.filteredUtilitiesMachines.length / this.itemsPerPageUtilities
    );
    this.currentPageUtilities = 1;
  }

  getEndItemUtilities(): number {
    return Math.min(
      this.currentPageUtilities * this.itemsPerPageUtilities,
      this.filteredUtilitiesMachines.length
    );
  }

  // === Data Fetching ===

  GetBykonState() {
    this._machineService.GetMachineState(0).subscribe({
      next: (data: MachineState[][]) => {
        this.MachineProduction = data[0];
        this.filteredProductionMachines = [...this.MachineProduction];
        this.totalBecons = data[0].length;
        this.totalActive = this.MachineProduction.filter(
          (x) => x.beacon_Status === 'OnLine'
        ).length;
        this.totalInactive = this.MachineProduction.filter(
          (x) => x.beacon_Status === 'OffLine'
        ).length;
        this.filterProduction();
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching production machines', error);
      },
    });
  }

  GetEnergyMachineState() {
    this._reportService.EnergyMachineState().subscribe({
      next: (data) => {
        this.MachineUtilites = data;
        this.filteredUtilitiesMachines = [...this.MachineUtilites];
        this.totalBeconsU = data.length;
        this.totalActiveU = this.MachineUtilites.filter(
          (x) => x.status === 'ONLINE'
        ).length;
        this.totalInactiveU = this.MachineUtilites.filter(
          (x) => x.status === 'OFFLINE'
        ).length;
        this.filterUtilities();
        this.updatePaginationUtilities();
      },
      error: (error) => {
        console.error('Error fetching utilities machines', error);
      },
    });
  }
}
