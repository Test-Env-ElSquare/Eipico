import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionChartOptions } from 'src/app/core/chartModel/apex';
import { MainDashboardService } from '../../services/main-dashboard.service';
import { factoryProduction } from '../../models/model';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  EURChartOptions: any = {};
  totalFillersCount:number;
  @Input()eurValue : factoryProduction[];
  constructor(
    private _mainDashboard:MainDashboardService
  ) { }

  GetEnergyConsumption(){
    this._mainDashboard.GetEnergyConsumption().subscribe(
      (res)=> {
        this.totalFillersCount= res[0].totalFillersCount
        this.EURChartOptions = ConsumptionChartOptions({
          energySeries: res[0].fillersSeries,
          energyTimeSeries :res[0].fillersTimeSeries
        });

      }
    )
  }

  ngOnInit(): void {
    this.GetEnergyConsumption()
  }

}
