import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public SetLineChartOptions: any = {};
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#000",
    cardBg         : "#fff",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }

  constructor() { }

  ngOnInit(): void {
    this.SetLineChartOptions = getSetLineChartOptions(
      this.obj,

    )
  }

}

function getSetLineChartOptions(obj: any) {
  return {
      series: [
        {
          name: "stepline-series",
          data: [1,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,0,]
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      stroke: {
        curve: "stepline"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Speed Chart",
        align: "left"
      },
      markers: {
        hover: {
          sizeOffset: 4
        }
      }
    };
  };


