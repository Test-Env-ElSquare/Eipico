import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-copy-details',
  templateUrl: './machine-copy-details.component.html',
  styleUrls: ['./machine-copy-details.component.scss'],
})
export class MachineCopyDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Input() machines: any[] = [];
  @Input() filteredMachines: any[] = [];

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
}
