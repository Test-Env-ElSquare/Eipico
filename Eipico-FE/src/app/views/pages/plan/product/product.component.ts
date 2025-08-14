import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { PeoplesData, Person } from 'src/app/core/dummy-datas/peoples.data';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { PalnService } from '../Paln.service';

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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public TimeLineChartOptionsL: any = {};
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
  basicModalCode: any;
  basicModalCloseResult: string = '';
  selectedDate: any;
  date: { year: number; month: number };
  defaultDatepickerCode: any;
  selectedPeople: any = null;
  simpleItems: any = [];
  selectedSimpleItem: any = null;
  people: Person[] = [];
  MachineIDArr: string[];
  PlantIDArr: string[];
  time = { hour: 13, minute: 30 };
  Starttime: any;
  Endtime: any;
  timeWithSeconds = { hour: 13, minute: 30, second: 20 };
  defaultTimepickerCode: any;
  meridianCode: any;
  secondsCode: any;
  selectedplantFilter: any;
  // new Var
  //***************************************** */
  selectedplant: any;
  selectedLine: any;
  selectedShift: any;
  FactoriesDropDown: any = [];
  LineDropDown: any = [];
  MachineDropDown: any = [];
  FactoryName: any;
  MainReason: any = [];
  selectedMainReason: any;
  openAddBtnInMainReason: boolean;
  MainReasonValue: any;
  SkudropDown: any = [];
  SelectedsubReason: any;
  showReduceSpeedField: boolean;
  getPlanShiftMaterialConsumptions: any;
  startTime: any;
  endTime: any;
  addNewPostForm: FormGroup;
  lineNum: any;
  Target: any;
  loadonDelete: boolean = false;
  ShiftArr = [
    {
      name: 'Shift 1',
      id: 'Shift1',
    },
    {
      name: 'Shift 2',
      id: 'Shift2',
    },
  ];
  planeLoader: boolean = false;
  // time
  constructor(
    private builder: FormBuilder,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private _PalnService: PalnService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.basicModalCode = basicModal;
    this.CerateForm();
    this.getFactory();
    this.TimeLineChartOptionsL = getTimeLineChartOptions(this.obj);
    this.getAllPaln();
  }

  getAllPaln() {
    this.planeLoader = false;
    this._PalnService
      .GetPlanShiftMaterialConsumptions()
      .subscribe((data: any) => {
        if (data) {
          this.getPlanShiftMaterialConsumptions = data;
          this.planeLoader = true;
        }
      });
  }
  CerateForm() {
    this.addNewPostForm = this.builder.group({
      id: 0,
      factory: '',
      lineNumber: 0,
      factoryId: new FormControl(null, [Validators.required]),
      Shift: new FormControl(null, [Validators.required]),
      Target: new FormControl(null, [Validators.required]),
      line: new FormControl(null, [Validators.required]),
      sku: new FormControl(null, [Validators.required]),
      shiftStartTime: new FormControl(null, [Validators.required]),
    });
  }
  postform() {
    let obj = Object.assign({}, this.addNewPostForm.value);
    console.log(this.addNewPostForm.value, 'post from form');
    this._PalnService.PostPlanShiftMaterialConsumptions(obj).subscribe(
      (data: any) => {
        this.toastr.success(data.message);
        this.addNewPostForm.get('Target')?.reset();
        this.addNewPostForm.get('sku')?.reset();
        this.addNewPostForm.get('factoryId')?.reset();
        this.addNewPostForm.get('Shift')?.reset();
        this.addNewPostForm.get('line')?.reset();
        this.addNewPostForm.get('shiftStartTime')?.reset();
        this.getAllPaln();
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }
  selectToday(): void {
    this.selectedDate = this.calendar.getToday();
  }
  getFactory() {
    this._PalnService.Factories().subscribe((data) => {
      this.FactoriesDropDown = data;
      this.selectedplant = data[0].id;
      this.lineID(this.selectedplant);
    });
  }

  lineID(id: any) {
    this.FactoriesDropDown.filter((e: any) => {
      if (id == e.id) {
        this.FactoryName = e.name;
      }
    });
    if (id != null) {
      this._PalnService.Lines(id).subscribe((data) => {
        this.LineDropDown = data;
        this.selectedLine = data[0].id;
      });
    }
  }
  // GetMachine(id:any){
  //   if(id != null){
  //     this._PalnService.Machine(id).subscribe((data)=> this.MachineDropDown = data)
  //   }
  // }
  GetSKUsByFactoryLine(line: any) {
    this.LineDropDown.filter((e: any) => {
      if (line == e.id) {
        this.lineNum = e.lineNum;
      }
    });
    this._PalnService
      .GetSKUsByFactoryLine(this.FactoryName, this.lineNum)
      .subscribe((data: any) => {
        this.SkudropDown = data;
      });
  }
  GetPlanShiftMaterialConsumptionsBySpecificDate(date: any, plant: any) {
    this.planeLoader = true;
    this.getPlanShiftMaterialConsumptions = [];
    date = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day + 1
    ).toISOString();
    this._PalnService
      .GetPlanShiftMaterialConsumptionsBySpecificDate(date, plant || 0)
      .subscribe((data: any) => {
        this.getPlanShiftMaterialConsumptions = data;
        this.planeLoader = false;
      });
  }

  openBasicModal(content: TemplateRef<any>, formVale: any) {
    this.OpenEditForm(formVale);
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
        this.basicModalCloseResult = 'Modal closed' + result;
        this.OnEdit(formVale.id, this.addNewPostForm.value);
      })
      .catch((res) => {});
  }
  delete(id: any, date: any) {
    this.loadonDelete = true;
    this._PalnService
      .DeletePlanShiftMaterialConsumptions(id)
      .subscribe((data: any) => {
        this.toastr.error(data.message);
        this.getAllPaln();
        setTimeout(() => {
          this.loadonDelete = false;
        }, 2000);
      });
  }
  OnEdit(id: any, formObj: any) {
    console.log(formObj);
    this._PalnService
      .EditPlanShiftMaterialConsumptions(id, formObj)
      .subscribe((data: any) => {
        this.toastr.info(data.message);
        this.getAllPaln();
        this.addNewPostForm.controls['id'].setValue(0);
      });
  }
  OpenEditForm(form: any) {
    this._PalnService
      .GetPlanShiftMaterialConsumptionsById(form.id)
      .subscribe((data: any) => {
        this.lineID(data.factoryId);
        this.addNewPostForm.controls['id'].setValue(form.id);
        this.addNewPostForm.controls['factory'].setValue('');
        this.addNewPostForm.controls['lineNumber'].setValue(0);
        this.addNewPostForm.controls['line'].setValue(data.line);
        this.addNewPostForm.controls['factoryId'].setValue(data.factoryId);
        this.addNewPostForm.controls['Shift'].setValue(data.Shift);
        this.addNewPostForm.controls['shiftStartTime'].setValue(
          data.shiftStartTime
        );
        this.addNewPostForm.controls['sku'].setValue(data.sku);
        this.addNewPostForm.controls['Target'].setValue(data.target);
      });
  }
}
/**
 * Line chart options
 */
function getTimeLineChartOptions(obj: any) {
  return {
    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
        ],
      },
    ],
    chart: {
      height: 150,
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    stroke: {
      width: 1,
    },
    fill: {
      type: 'solid',
      opacity: 0.6,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  };
}
