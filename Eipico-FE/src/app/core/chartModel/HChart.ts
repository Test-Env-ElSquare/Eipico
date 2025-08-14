import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HC_timeLine from 'highcharts/modules/timeline';
import Drilldown from 'highcharts/modules/drilldown';
import colorAxis from 'highcharts/modules/coloraxis';
import HighchartsBullet from 'highcharts/modules/bullet';
import sankey from 'highcharts/modules/sankey';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
HC_timeLine(Highcharts);
Drilldown(Highcharts);
colorAxis(Highcharts);
HighchartsBullet(Highcharts);
sankey(Highcharts);

const obj = {
  circleBarValueColor: '#6a94c6',
  circleBarBgColor: '#def',
  primary: '#6571ff',
  secondary: '#7987a1',
  success: '#05a34a',
  info: '#66d1d1',
  warning: '#fbbc06',
  danger: '#ff3366',
  light: '#e9ecef',
  dark: '#060c17',
  muted: '#7987a1',
  gridBorder: 'rgba(77, 138, 240, .15)',
  bodyColor: '#000',
  cardBg: '#fff',
  fontFamily: "'Roboto', Helvetica, sans-serif",
};

export function GaugeChartChartModel({ ...data }) {
  Highcharts.chart(data.id, {
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: '80%',
    },

    title: {
      text: data.text,
    },

    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ['50%', '75%'],
      size: '110%',
    },
    yAxis: {
      min: 0,
      max: 200,
      tickPixelInterval: 72,
      tickPosition: 'inside',
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: '14px',
        },
      },
      plotBands: [
        {
          from: 0,
          to: 120,
          color: '#55BF3B', // green
          thickness: 20,
        },
        {
          from: 120,
          to: 160,
          color: '#DDDF0D', // yellow
          thickness: 20,
        },
        {
          from: 160,
          to: 200,
          color: '#DF5353', // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: 'Speed',
        data: [data.series ? data.series : 0],
        tooltip: {
          valueSuffix: ' km/h',
        },
        dataLabels: {
          format: '{y} km/h',
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            '#333333',
          style: {
            fontSize: '16px',
          },
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%',
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6,
        },
      },
    ],
  } as any);
}

export function createGuageChart({ ...data }): void {
  Highcharts.chart({
    chart: {
      type: 'solidgauge',
      animations: {
        enabled: false,
      },
      renderTo: data.id,
      defaultSeriesType: 'solidgauge',
      events: {
        load: true,
      },
    },

    title: null,

    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    //the value axis
    yAxis: {
      min: 0,
      max: data.max ? data.max : 0,
      stops: [
        [0.1, obj.success], // green
        [20000, obj.success], // yellow
        [40000, obj.success], // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        name: 'Speed',
        data: [data.series],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">BPH</span>' +
            '</div>',
        },
        tooltip: {
          valueSuffix: 'BPH',
        },
        credits: {
          enabled: false,
        },
      },
    ],
  } as any);
}

export function AreaChartChartModel({ ...data }) {
  Highcharts.chart(data.id, {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    // accessibility: {
    // description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    // },
    title: {
      text: data.title,
    },

    subtitle: {
      text:
        'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
        'target="_blank">FAS</a>',
    },
    xAxis: {
      allowDecimals: false,
      categories: data.categories,

      // labels: {
      //     formatter: function () {
      //         return this.value; // clean, unformatted number for year
      //     }
      // },
      // accessibility: {
      //     rangeDescription: 'Range: 1940 to 2017.'
      // }
    },
    yAxis: {
      // title: {
      //     text: 'Nuclear weapon states'
      // },
      // labels: {
      //     formatter: function () {
      //         return this.value / 1000 + 'k';
      //     }
      // }
    },
    // colorAxis: {
    //   min: 0,
    //   stops: [[0, '#005AA8']]
    // },
    tooltip: {
      pointFormat:
        '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
    },
    plotOptions: {
      area: {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
    },
    series: [
      {
        name: name,
        data: data.series,
        color: obj.primary,
        animation: false,
      },
    ],
  } as any);
}

export function DrilDownChartModelRefactor({ ...data }) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ',',
    },
  });

  Highcharts.chart(data.id, {
    chart: {
      type: 'column',
    },

    title: {
      align: 'left',
      text: `${data.Name} Production`,
    },

    events: {
      click: (e: any) => {
        console.log(e);
        e.point.color = 'rgb(228 106 106)';
      },
    },

    subtitle: {
      align: 'left',
      text: 'Click the columns to view more details',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },

    xAxis: {
      type: 'category',
    },

    yAxis: {
      title: {
        text: `Total ${data.Name ?? 'test'} Production`,
      },
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:,.0f}',
        },
      },
    },

    tooltip: {
      headerFormat: ' <span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name  }</span>: <b>{point.y:.2f}</b> of total<br/>',
    },

    series: [
      {
        name: data.Name,
        colorByPoint: true,
        data: data.factory
          ? data.factory
          : [
              {
                name: 'Alexandria',
                y: 429,
                drilldown: 'Alex',
              },
              {
                name: 'Assiut',
                y: 283,
                drilldown: 'Asyt',
              },
              {
                name: 'Qalyub',
                y: 0,
                drilldown: 'Qlyb',
              },
              {
                name: 'Sadat',
                y: 234,
                drilldown: 'Sdat',
              },
              {
                name: 'Tanta',
                y: 593,
                drilldown: 'Tnta',
              },
            ],
        events: {
          click: (e: any) => {},
        },
      },
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right',
        },
      },
      series: data.line
        ? data.line
        : [
            {
              name: 'Alexandria',
              id: 'Alex',
              data: [
                ['1', 127],
                ['2', 55],
                ['3', 0],
                ['4', 0],
                ['5', 247],
              ],
            },
            {
              name: 'Assiut',
              id: 'Asyt',
              data: [
                ['1', 124],
                ['2', 1],
                ['3', 70],
                ['6', 88],
              ],
            },
            {
              name: 'Qalyub',
              id: 'Qlyb',
              data: [['4', 0]],
            },
            {
              name: 'Sadat',
              id: 'Sdat',
              data: [['5', 234]],
            },
            {
              name: 'Tanta',
              id: 'Tnta',
              data: [
                ['2', 0],
                ['4', 593],
              ],
            },
          ],
      events: {
        click: (e: any) => {},
      },
    },
  } as any);
}

export function createChartspeed({ ...data }): void {
  Highcharts.chart(data.id, {
    chart: {
      zoomType: 'x',
      type: data.type,
      renderTo: data.id,
    },
    title: {
      text: '',
    },
    xAxis: {
      allowDecimals: false,
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: `Machine ${data.yAxistext} Charts`,
      },
    },
    tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
      area: {
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: `<div class="fs-4 ">${data.seriesname}</div>`,
        data: data.series,
      },
    ],
  } as any);
}

export function createAreaSpline({ ...data }) {
  Highcharts.chart(data.id, {
    chart: {
      type: 'areaspline',
      zoomType: 'x',
      renderTo: data.id,
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    legend: {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'top',
      y: 0,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
    },
    xAxis: {
      allowDecimals: false,
      type: 'datetime',
      categories: data.xAxisCategories,
      //   [
      //  '/22/2023, 2:04:00 AM', '5/22/2023, 2:09:00 AM', '5/22/2023, 2:14:00 AM', '5/22/2023, 2:19:00 AM'
      //   ]
    },
    yAxis: {
      title: {
        text: `Machine ${data.yAxistext} Charts`,
      },
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>{series.name} {point.x}</b><br>',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        // pointStart: "2023-05-22T09:39:00"
      },
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: data.seriesname,
        //'Moose'
        data: data.series,
        // [100,1000,200000,0]
      },
    ],
  } as any);
}

export function createLineChart({ ...data }) {
  Highcharts.chart(data.id, {
    chart: {
      zoomType: 'x',
      renderTo: data.id,
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    yAxis: {
      title: {
        text: `Machine ${data.yAxistext} Charts`,
      },
    },
    xAxis: {
      allowDecimals: false,
      type: 'datetime',
      categories: data.xAxisCategories,
      //   [
      // '/22/2023, 2:04:00 AM', '5/22/2023, 2:09:00 AM', '5/22/2023, 2:14:00 AM', '5/22/2023, 2:19:00 AM'
      //   ]
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>{series.name} {point.x}</b><br>',
    },
    legend: {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'top',
      y: 0,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [
      {
        name: data.seriesname,
        data: data.series,
        //[43934, 48656, 65165, 81827]
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  } as any);
}

export function piechartModel({ ...data }): void {
  Highcharts.chart(data.id, {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      renderTo: data.id,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Browser market shares in May, 2020',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: data.series,
      },
    ],
  } as any);
}

export function createlineChart({ ...data }): void {
  Highcharts.chart(data.id, {
    chart: {
      renderTo: data.id,
      animations: {
        enabled: false,
      },
      type: data.type,
    },
    title: {
      text: data.text,
    },
    subtitle: {
      text: '',
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: 'Packets : <b>{point.y:.1f}</b>',
    },
    plotOptions: {
      series: {
        animation: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%',
        },
      },
    },
    series: [
      {
        name: 'Population',
        data: data.series,
        color: obj.primary,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
  } as any);
}

export function barChart({ ...data }) {
  Highcharts.chart(data.id, {
    chart: {
      renderTo: data.id,
      animations: {
        enabled: false,
      },
      type: 'bar',
    },
    title: {
      text: data.titleText,
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    xAxis: {
      categories: [],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: '',
    },
    plotOptions: {
      animation: false,
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      column: {
        pointWidth: 10,
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 20,
      floating: true,
      borderWidth: 0,
      backgroundColor:
        Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF',
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'planned',
        data: [data.planned],
      },
      {
        name: 'actual',
        data: [data.actual],
      },
    ],
  } as any);
}

export function sankeyChart({ ...data }) {
  Highcharts.chart(data.id, {
    title: {
      text: data.titleText ?? 'Highcharts Sankey Diagram',
    },
    tooltip: {
      pointFormat:
        '{point.fromNode.name} → {point.toNode.name}: <b>{point.weight}kg</b><br/>',
      valueSuffix: 'kg',
      nodeFormat: '{point.name}: <b>{point.sum}kg </b><br/>',
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          '{index}. {point.from} to {point.to}, {point.weight}.',
      },
    },
    series: [
      {
        keys: ['from', 'to', 'weight'],
        data: data.series
          ? data.series
          : [
              ['Brazil', 'Portugal', 5],
              ['Brazil', 'France', 1],
              ['Brazil', 'Spain', 1],
              ['Brazil', 'England', 1],
              ['Canada', 'Portugal', 1],
              ['Canada', 'France', 5],
              ['Canada', 'England', 1],
              ['Mexico', 'Portugal', 1],
              ['Mexico', 'France', 1],
              ['Mexico', 'Spain', 5],
              ['Mexico', 'England', 1],
              ['USA', 'Portugal', 1],
              ['USA', 'France', 1],
              ['USA', 'Spain', 1],
              ['USA', 'England', 5],
              ['Portugal', 'Angola', 2],
              ['Portugal', 'Senegal', 1],
              ['Portugal', 'Morocco', 1],
              ['Portugal', 'South Africa', 3],
              ['France', 'Angola', 1],
              ['France', 'Senegal', 3],
              ['France', 'Mali', 3],
              ['France', 'Morocco', 3],
              ['France', 'South Africa', 1],
              ['Spain', 'Senegal', 1],
              ['Spain', 'Morocco', 3],
              ['Spain', 'South Africa', 1],
              ['England', 'Angola', 1],
              ['England', 'Senegal', 1],
              ['England', 'Morocco', 2],
              ['England', 'South Africa', 7],
              ['South Africa', 'China', 5],
              ['South Africa', 'India', 1],
              ['South Africa', 'Japan', 3],
              ['Angola', 'China', 5],
              ['Angola', 'India', 1],
              ['Angola', 'Japan', 3],
              ['Senegal', 'China', 5],
              ['Senegal', 'India', 1],
              ['Senegal', 'Japan', 3],
              ['Mali', 'China', 5],
              ['Mali', 'India', 1],
              ['Mali', 'Japan', 3],
              ['Morocco', 'China', 5],
              ['Morocco', 'India', 1],
              ['Morocco', 'Japan', 3],
            ],
        type: 'sankey',
        name: 'Sankey demo series',
      },
    ],
  } as any);
}
