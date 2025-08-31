import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-eur',
  templateUrl: './eur.component.html',
  styleUrls: ['./eur.component.scss']
})
export class EURComponent implements OnChanges {
  @Input() numOfPartsandtotalEnergy: any;
  public chartOptions!: any;

  ngOnChanges() {
    if (this.numOfPartsandtotalEnergy) {
      this.chartOptions = {
        series: [
          {
            name: "EUR",
            data: [
              this.numOfPartsandtotalEnergy[0].eur,
              this.numOfPartsandtotalEnergy[1].eur
            ]
          }
        ],
        chart: {
          type: "bar",
          height: 250,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "30%",
            distributed: true   
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number) => val.toFixed(3),
          offsetY: -10,
          style: {
            colors: ["#000", "#fff"]
          }
        },
        xaxis: {
          categories: ["Eipico 1", "Eipico 2"]
        },
        title: {
          text: "EUR",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "bold"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right"
        },
        colors: ["#A0DBFB", "#0083CB"]
      };


    }
  }
}