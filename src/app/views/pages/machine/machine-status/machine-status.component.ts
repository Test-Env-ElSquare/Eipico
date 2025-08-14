import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModal,
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from '../../../../core/services/app-Service.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
const basicModal = {
  htmlCode: `<!-- Button trigger modal -->
<button class="btn btn-primary" (click)="openBasicModal(basicModal)">Launch demo modal</button>
<!-- Modal -->
<ng-template #basicModal let-modal>
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    <button type="button" class="btn-close" (click)="modal.close('by: close icon')" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <p>Modal body</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="modal.close('by: close button')">Close</button>
    <button type="button" class="btn btn-primary" (click)="modal.close('by: save button')">Save changes</button>
  </div>
</ng-template>
<!-- Close result -->
<p *ngIf="basicModalCloseResult != ''" class="mt-2">{{basicModalCloseResult}}</p>`,
  tsCode: `import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  basicModalCloseResult: string = '';

  constructor(private modalService: NgbModal) { }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
}`,
};
@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss'],
})
export class MachineStatusComponent implements OnInit {
  visibleSidebar2: boolean = false;
  selectedDate: NgbDateStruct;
  date: { year: number; month: number };
  defaultDatepickerCode: any;
  inPopupCode: any;
  rangeSelectionCode: any;
  rangeSelectionPopupCode: any;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | any;
  toDate: NgbDate | any;
  basicModalCode: any;
  basicModalCloseResult: string = '';
  public SetLineChartOptions: any = {};
  obj = {
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
  MachineFunctionality: any;
  selectedMachineFunctionality: any;
  FactoriesDropDown: any = [];
  LineDropDown: any = [];
  selectedFactory: any;
  selectedLine: any;
  FactoryName: any;
  MachinetagsData: any = [];
  MachineTagsSpeed: any = [];
  MachineData: any;
  Placeholder: boolean = false;
  ChartData: any = [];
  timestamp: any = [];
  chartPlaceholder: boolean = false;
  MachineTagPropertiesData: any = [];
  machineindicator: any;

  public TimeLineChartOptionsL: any = {};
  showdata: boolean = true;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private _AppServiceService: AppServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fromDate = this.calendar.getPrev(this.calendar.getToday(), 'd', 1);
    this.toDate = this.calendar.getToday();

    this._AppServiceService.MachineFunctionality().subscribe((data: any) => {
      this.MachineFunctionality = data;
      console.log('any', data);
      this.getFactory();
    });
    this.basicModalCode = basicModal;
  }
  getFactory(){
    this._AppServiceService.Factories().subscribe((data)=>{
      this.FactoriesDropDown = data;
      this.selectedFactory = data[0].id
      this.lineID(this.selectedFactory)
    })
  }

  lineID(id:any){
    this.FactoriesDropDown.filter((e:any)=>{
      if (id == e.id ) {
        this.FactoryName = e.name
      }
    })
    if(id != null){
      this._AppServiceService.Lines(id).subscribe((data)=>{
        this.LineDropDown = data;
        this.selectedLine = data[0].id
      })
    }

  }

  SerachBtn() {
    this.Placeholder = true;
    this._AppServiceService
      .MachineState(
        this.selectedFactory,
        this.selectedLine,
        this.selectedMachineFunctionality
      )
      .subscribe((data) => {
        console.log(data);
        if (data.sucess) {
          // this.router.navigate(['/newErr'])
          this.Placeholder = false;

          this.MachineData = data.data;
        } else {
          this.router.navigate(['/newErr']);
        }
      });
  }

  HistoryBasicModal(
    content: TemplateRef<any>,
    MachineId: any,
    Functionality: any,
    from: any,
    to: any
  ) {
    from = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day
    ).toISOString();
    to = new Date(
      this.toDate.year,
      this.toDate.month - 1,
      this.toDate.day
    ).toISOString();
    this._AppServiceService
      .GetStateHistory(MachineId, Functionality, from, to)
      .subscribe((data: any) => {
        if (data.data.length == 0) {
          this.Placeholder = false
          console.log("errrrrrrrrrrrrrr")
        }
        else {
          this.ChartData = data.data;
          this.createChartspeed('HistoryChart', this.ChartData, 'line');

        }
      });
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        console.log('Modal closed' + result);
        this.ChartData = [];
      })
      .catch((res) => {});
  }
  TagsBasicModal(
    content: TemplateRef<any>,
    MachineId: any,
    from: any,
    to: any
  ) {
    this._AppServiceService
      .MachineTagProperties(MachineId)
      .subscribe((data) => (this.MachineTagPropertiesData = data.data));
    from = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day
    ).toISOString();
    to = new Date(
      this.toDate.year,
      this.toDate.month - 1,
      this.toDate.day
    ).toISOString();
    this._AppServiceService
      .MachineTag(MachineId, from, to)
      .subscribe((data: any) => {
        if (data) {
          this.showdata = false;
          this.MachinetagsData = data.data;
        }
      });
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        this.MachineTagsSpeed = [];
        console.log('Modal closed' + result);
        this.showdata = true;
      })
      .catch((res) => {});
  }
  IndicatorsBasicModal(
    content: TemplateRef<any>,
    factory: any,
    lineId: any,
    MachineId: any,
    from: any,
    to: any
  ) {
    from = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day
    ).toISOString();
    to = new Date(
      this.toDate.year,
      this.toDate.month - 1,
      this.toDate.day
    ).toISOString();
    this._AppServiceService
      .MachineIndicator(factory, lineId, MachineId, from, to)
      .subscribe((res: any) => {
        if (res) {
          this.showdata = false;
          this.machineindicator = res.data[0]?.machineindicator[0];
          console.log(this.machineindicator);
          this.TimeLineChartOptionsL = this.getTimeLineChartOptions(
            this.obj,
            this.machineindicator.machinetimeline
          );
        }
      });
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        console.log('Modal closed' + result);
        this.machineindicator = [];
        this.machineindicator.machinetimeline = [];
        this.showdata = true;
      })
      .catch((res) => {});
  }

  tagsChartBtn(ChartPropirty: any, chartType: string) {
    this.MachineTagsSpeed = [];
    this.MachinetagsData.map((e: any) => {
      let MachineSpeed = [new Date(e.timeStamp).getTime(), e[ChartPropirty]];
      this.MachineTagsSpeed.push(MachineSpeed);
      this.createChartspeed('TagsSpeedChart', this.MachineTagsSpeed, chartType);
    });
  }

  private createChartspeed(chartId: any, data: any, type: any): void {
    Highcharts.chart(chartId, {
      chart: {
        zoomType: 'x',
        type: type,
      },
      // accessibility: {
      //     description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
      // },
      title: {
        text: '',
      },
      // subtitle: {
      //     text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
      //         'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
      //         'armscontrol.org</a>'
      // },
      xAxis: {
        allowDecimals: false,
        // categories:time,
        type: 'datetime',

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
        title: {
          text: 'Machine State Charts',
        },

        // labels: {
        //     formatter: function () {
        //         return this.value / 1000 + 'k';
        //     }
        // }
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
          name: 'State',
          data: data,
        },
      ],
    } as any);
  }

  private getTimeLineChartOptions(obj: any, timeline: any = []) {
    return {
      series: timeline,
      chart: {
        height: 100,
        type: 'rangeBar',
        animations: {
          enabled: false,
        },
      },

      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%',
          rangeBarGroupRows: true,
        },
      },
      colors: ['#008FFB'],
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
        colors: [obj.primary, obj.danger, obj.warning],
      },
      tooltip: {
        fillSeriesColor: true,
        enabled: true,
      },
    };
  }

  selectToday(): void {
    this.selectedDate = this.calendar.getToday();
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
