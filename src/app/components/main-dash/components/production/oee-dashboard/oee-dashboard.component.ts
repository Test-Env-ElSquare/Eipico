import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-oee-dashboard',
  templateUrl: './oee-dashboard.component.html',
  styleUrls: ['./oee-dashboard.component.scss']
})
export class OeeDashboardComponent implements OnChanges {
  @Input() RadarChartOptions: any;

  constructor() { }

  ngOnChanges(): void {

  }

}
