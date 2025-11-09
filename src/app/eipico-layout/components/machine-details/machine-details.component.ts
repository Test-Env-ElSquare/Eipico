import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss'],
})
export class MachineDetailsComponent implements OnInit {
  @Input() machines: any[] = [];
  @Input() filteredMachines: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
