import { Component, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-energy-consumption',
  templateUrl: './energy-consumption.component.html',
  styleUrls: ['./energy-consumption.component.scss']
})
export class EnergyConsumptionComponent implements OnChanges {
  @Input() numOfPartsandtotalEnergy: any;
  public chartOptions!: any;

  ngOnChanges() {
    if (this.numOfPartsandtotalEnergy) {
      this.chartOptions = {
        series: [
          {
            name: "Eipico 1",
            data: [this.numOfPartsandtotalEnergy[0].toalenergy]
          },
          {
            name: "Eipico 2",
            data: [this.numOfPartsandtotalEnergy[1].toalenergy]
          }
        ],
        chart: {
          type: "bar",
          height: 150,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => val.toLocaleString(),
          style: {
            colors: ["#000000", "#FFFFFF"] 
          }
        },
        xaxis: {
          labels: { show: false },
          axisTicks: { show: false },
          axisBorder: { show: false },
          categories: ["", ""]
        },
        yaxis: {
          labels: { show: false },
        },
        title: {
          text: "Total Energy Consumption",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left"
        },
        colors: ["#A0DBFB", "#0083CB"]
      };


    }
  }
}