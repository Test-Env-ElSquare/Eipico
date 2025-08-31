import { ChartData } from "chart.js"

const obj = {
  circleBarValueColor: '#6a94c6',
  circleBarBgColor: '#def',
  primary: "#6571ff",
  secondary: "#7987a1",
  success: "#05a34a",
  info: "#66d1d1",
  warning: "#fbbc06",
  danger: "#ff3366",
  light: "#e9ecef",
  dark: "#060c17",
  muted: "#7987a1",
  gridBorder: "rgba(77, 138, 240, .15)",
  bodyColor: "#000",
  cardBg: "#fff",
  fontFamily: "'Roboto', Helvetica, sans-serif",
  transparent: 'transparent'
}


export function radialBarChartFunc({ ...data }) {
  return {
    series: [data.series],
    chart: {
      height: 180,
      type: "radialBar"
    },
    colors: [obj.circleBarValueColor],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 8,
          size: "55%"
        },
        track: {
          show: true,
          background: obj.circleBarBgColor,
          strokeWidth: '100%',
          opacity: 1,
          margin: 3,
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -8,
            show: true,
            color: obj.circleBarValueColor,
            fontSize: "11px",
            fontWeight: "500"
          },
          value: {
            color: obj.circleBarValueColor,
            fontSize: "20px",
            show: true,
            fontWeight: "600",
            offsetY: 4,
            formatter: function (val:any) {
              return val + data.symbole
            }
          }
        }
      }
    },
    fill: {
      opacity: 1
    },
    stroke: {
      lineCap: "round",
      width: 8
    },
    labels: [data.name]
  }
}

export function getBarChartOptions(data: any) {
  return {
    series: [
      {
        data: data
      }
    ],
    chart: {
      type: 'rangeBar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      textAnchor: "middle",

      enabled: true,
      style: {
        colors: ["#000"],
      },
    },
    legend: {
      fontWeight: 900,
    },

    xaxis: {
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,

        style: {
          colors: [],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: "13px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-label",
        },
      },
    },
  }
};

export function TimelineChartModel({ ...data }) {
  return {
    series: data.series ? data.series : [
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679385679069,
              1679397682480
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679397682480,
              1679405725861
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679405725861,
              1679408386998
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "OffLine",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679408386998,
              1679408625590
            ],
            "fillColor": "#e61e2b"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679408625590,
              1679410187321
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679410187321,
              1679410795619
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679410795619,
              1679411174518
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "OffLine",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679411174518,
              1679411347894
            ],
            "fillColor": "#e61e2b"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679411347894,
              1679413710753
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679413710753,
              1679414083684
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679414083684,
              1679425276968
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679425276968,
              1679439397003
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "Cleaning in Process",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679439397003,
              1679441974310
            ],
            "fillColor": "#57769a"
          }
        ]
      },
      {
        "name": "OffLine",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679441974310,
              1679442188902
            ],
            "fillColor": "#e61e2b"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679442188902,
              1679465720284
            ],
            "fillColor": "#a1ca70"
          }
        ]
      },
      {
        "name": "OffLine",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679465720284,
              1679465939887
            ],
            "fillColor": "#e61e2b"
          }
        ]
      },
      {
        "name": "Online",
        "data": [
          {
            "x": "Line 4",
            "y": [
              1679465939887,
              1679471941584
            ],
            "fillColor": "#a1ca70"
          }
        ]
      }
    ],
    chart: {
      height: 150,
      type: 'rangeBar',
      animations: {
        enabled: false,
      },
    },
    noData: {
      text: 'test',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 8,
      style: {
        color: '#000',
        fontSize: '14px'
      }
    },

    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true,
      },
    },
    colors: ["#000"],
    fill: {
      type: 'solid',
    },

    xaxis: {
      type: 'datetime',

    },
    legend: {
      position: 'right',
      show: false,
    },
    dataLabels: {
      enabled: false,
      colors: obj.primary,
    },
    tooltip: {
      followCursor: true,
      intersect: true,
      inverseOrder: false,
      style: {
        fontSize: '12px',
        flexDirection: 'row-reverse'
      },
      x: {
        formatter: function (value: any) {
          // ${new Date(value).getUTCHours()}:${new Date(value).getUTCMinutes()}:${new Date(value).getUTCSeconds()}
          //10800000 to remove 3 milliseconds hours
          return `
          <span class="fw-bolder text-primary">Day</span>
          ${new Date(value).getUTCDate()}/${new Date(value).getUTCMonth() + 1}/${new Date(value).getUTCFullYear()}
          <span class="fw-bolder text-danger">Time</span>
          ${new Date(value - (new Date().getTimezoneOffset() * -60 * 1000)).toLocaleTimeString()}
          `
        },
        show: true,
        //format: 'dd MMM yyyy HH:MM:ss',
        min: data.min,
        max: data.max,

      },
    }


  }
}

export function ConsumptionChartOptions({ ...data }) {
  return {
    series: [{
      name: '',
      data: data.energySeries ? data.energySeries : [161686.65, 123604.87, 803956.96, 96497.26, 129445.11, 156498.37, 131155.63, 62.74]
    }],
    chart: {
      type: "bar",
      height: 60,
      sparkline: {
        enabled: !0
      }
    },
    colors: [obj.primary],
    xaxis: {
      type: 'datetime',
      categories: data.energyTimeSeries ? data.energyTimeSeries : [
        "3/15/2023",
        "3/16/2023",
        "3/17/2023",
        "3/18/2023",
        "3/19/2023",
        "3/20/2023",
        "3/21/2023",
        "3/22/2023"
      ]
      ,
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    markers: {
      size: 0
    },
    tooltip: {
      x: {
        formatter: function (value: any) {
          return new Date(value).toLocaleDateString() // The formatter function overrides format property
        },
      },
      y: {
        formatter: function (value: any) {
          return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    }
  }
};

export function getRadarChartOptions({ ...data }) {
  return {
    series: [
      {
        name: 'OEE',
        data: data.sleSeries ? data.sleSeries : [
          31.00,
          30.00,
          0.00,
          32.00,
          35.00,
          40.00,
          43.00
        ],
      },

    ],
    chart: {
      height: 289,
      type: 'radar',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary, obj.warning, obj.danger],
    grid: {
      padding: {
        bottom: -6,
        right: 30,
        left: 30
      }
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 7,
        vertical: 0
      },
    },
    // labels: ['2011', '2012', '2013', '2014', '2015', '2016'],
    stroke: {
      width: 1,
    },
    fill: {
      opacity: 0.75
    },
    xaxis: {
      categories: data.timeSeries ? data.timeSeries : [
        "3/15/2023",
        "3/16/2023",
        "3/17/2023",
        "3/18/2023",
        "3/19/2023",
        "3/20/2023",
        "3/21/2023"
      ],
      labels: {
        show: true,
        style: {
          colors: [obj.secondary, obj.secondary, obj.secondary, obj.secondary, obj.secondary, obj.secondary],
          fontSize: "11px",
          fontFamily: obj.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: obj.transparent,
          fontSize: "11px",
          fontFamily: obj.fontFamily
        }
      }
    },
    markers: {
      size: 5
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: obj.gridBorder,
          strokeWidth: 5,
          connectorColors: obj.gridBorder,
          fill: {
            colors: obj.secondary
          }
        }
      }
    }
  }
};
