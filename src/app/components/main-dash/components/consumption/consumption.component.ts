import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionChartOptions } from 'src/app/core/chartModel/apex';
import { MainDashboardService } from '../../services/main-dashboard.service';
import { factoryProduction } from '../../models/model';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit {
  EURChartOptions: any = {};
  totalFillersCount: number;
  isLoading = true;
  loadError = false;
  @Input() eurValue: factoryProduction[];
  constructor(private _mainDashboard: MainDashboardService) {}

  GetEnergyConsumption() {
    this.isLoading = true;
    this.loadError = false;
    this._mainDashboard.GetEnergyConsumption().subscribe({
      next: (res) => {
        this.totalFillersCount = res[0].totalFillersCount;

        // FIX: assign the data here
        this.eurValue = res[0].factoryProduction;

        this.EURChartOptions = ConsumptionChartOptions({
          energySeries: res[0].fillersSeries,
          energyTimeSeries: res[0].fillersTimeSeries,
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      },
    });
  }

  ngOnInit(): void {
    this.GetEnergyConsumption();
  }
}
