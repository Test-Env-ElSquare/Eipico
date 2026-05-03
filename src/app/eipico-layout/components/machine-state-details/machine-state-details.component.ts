import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-state-details',
  templateUrl: './machine-state-details.component.html',
  styleUrls: ['./machine-state-details.component.scss'],
})
export class MachineStateDetailsComponent implements OnInit {
  @Input() machines: any[] = [];
  @Input() filteredMachines: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
