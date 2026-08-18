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

// API returns dates as "DD/MM/YYYY" — parsed manually because the native
// Date constructor reads slash-separated strings as MM/DD/YYYY and silently
// produces an Invalid Date (or the wrong day) for this format.
function parseDayMonthYear(value: string): Date {
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

// The API repeats the same date once per line/shift (e.g. two "11/08/2026"
// entries back to back). Group those repeats into one series per occurrence
// — "Eipico 1" for the first entry of each day, "Eipico 2" for the second,
// etc. — so the chart draws grouped columns per day instead of flattening
// same-day bars into indistinguishable neighbours.
function groupByDay(values: number[], dateLabels: string[]) {
  const order: string[] = [];
  const buckets: { [day: string]: number[] } = {};

  dateLabels.forEach((day, i) => {
    if (!buckets[day]) {
      buckets[day] = [];
      order.push(day);
    }
    buckets[day].push(values[i]);
  });

  const seriesCount = order.reduce((max, day) => Math.max(max, buckets[day].length), 1);
  const series = Array.from({ length: seriesCount }, (_, i) => ({
    name: `Eipico ${i + 1}`,
    data: order.map((day) => buckets[day][i] ?? null),
  }));

  return { categories: order, series };
}

export function ConsumptionChartOptions({ ...data }) {
  const rawValues: number[] = data.energySeries ? data.energySeries : [
    1181539, 187554, 1044896, 213003, 939762, 102792, 340100, 54, 561781, 110741, 925130, 228020, 1083563, 298958
  ];
  const rawDates: string[] = data.energyTimeSeries ? data.energyTimeSeries : [
    "11/08/2026", "11/08/2026", "12/08/2026", "12/08/2026", "13/08/2026", "13/08/2026", "14/08/2026", "14/08/2026",
    "15/08/2026", "15/08/2026", "16/08/2026", "16/08/2026", "17/08/2026", "17/08/2026"
  ];

  const { categories, series } = groupByDay(rawValues, rawDates);
  return {
    series,
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
      fontFamily: obj.fontFamily,
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 4,
        // Keeps the label above the column instead of inside it, so a bar
        // too short to hold text (a small value next to a huge one) still
        // shows its number legibly.
        dataLabels: {
          position: 'top',
        },
      }
    },
    // Axis stays linear (bar height = true proportion). A log scale would
    // make far-apart values look close together, which is worse than a
    // small bar — so instead every bar prints its exact value as text.
    dataLabels: {
      enabled: true,
      offsetY: -18,
      style: {
        fontSize: "10px",
        fontFamily: obj.fontFamily,
        colors: [obj.secondary],
      },
      formatter: function (value: any) {
        return value == null ? '' : value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    legend: {
      show: series.length > 1,
      position: "top",
      horizontalAlign: 'right',
      fontFamily: obj.fontFamily,
    },
    // Categories are already de-duplicated to one entry per day — each
    // series supplies its own value for that day, drawn as grouped columns.
    xaxis: {
      type: 'category',
      categories,
      labels: {
        style: { colors: obj.secondary, fontSize: "11px", fontFamily: obj.fontFamily },
        formatter: function (value: any) {
          if (typeof value === 'string' && value.includes('/')) {
            const [day, month] = value.split('/');
            return `${day}/${month}`;
          }
          return value;
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: obj.secondary, fontSize: "11px", fontFamily: obj.fontFamily },
        formatter: function (value: any) {
          return Math.round(value)?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    },
    grid: {
      borderColor: obj.gridBorder,
      strokeDashArray: 4,
    },
    colors: [obj.primary, obj.warning, obj.info, obj.success],
    fill: {
      opacity: 1
    },
    stroke: {
      width: 0
    },
    markers: {
      size: 0
    },
    tooltip: {
      x: {
        formatter: function (value: any) {
          if (typeof value === 'string' && value.includes('/')) {
            const parsed = parseDayMonthYear(value);
            return isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
          }
          return value;
        },
      },
      y: {
        formatter: function (value: any) {
          return value?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
    dataLabels: {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 4,
        padding: 3,
        opacity: 0.9,
      },
      style: {
        fontSize: "10px",
        fontFamily: obj.fontFamily,
        colors: [obj.primary]
      },
      formatter: function (value: any) {
        return Math.round(value * 10) / 10 + '%';
      }
    },
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
          strokeWidth: 1,
          connectorColors: obj.gridBorder,
          fill: {
            // ApexCharts expects an array here (colors alternate ring by
            // ring) — a bare string was silently breaking the radar render.
            colors: [obj.light, obj.transparent]
          }
        }
      }
    }
  }
};
