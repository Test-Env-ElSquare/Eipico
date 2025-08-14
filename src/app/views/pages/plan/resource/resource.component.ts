import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PeoplesData, Person } from 'src/app/core/dummy-datas/peoples.data';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PalnService } from '../Paln.service';


const basicModal = {
  htmlCode:
`<!-- Button trigger modal -->
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
  tsCode:
`import { Component } from '@angular/core';
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
}`
}
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  public TimeLineChartOptionsL: any = {};
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
  basicModalCode: any;
  basicModalCloseResult: string = '';
  selectedDate: NgbDateStruct;
  date: { year: number, month: number };
  defaultDatepickerCode: any;
  selectedPeople: any = null;
  simpleItems: any = [];
  selectedSimpleItem: any = null;
  people: Person[] = [];
  MachineIDArr: string[];
  PlantIDArr: string[];
  time = {hour: 13, minute: 30};
  Starttime :any
  Endtime :any;
  timeWithSeconds = {hour: 13, minute: 30, second: 20};
  defaultTimepickerCode: any;
  meridianCode: any;
  secondsCode: any;
  // new Var
  //***************************************** */
  selectedplant:any = 1;
  selectedLine: any = 17;
  selectedMachine:any;
  FactoriesDropDown:any = []
  LineDropDown: any = [];
  MachineDropDown: any = [];
  FactoryName: any = "Alex";
  MainReason :  any = [];
  selectedMainReason:any
  openAddBtnInMainReason: boolean;
  MainReasonValue: any;
  subReasonDropDownValue: any = [];
  SelectedsubReason: any ;
  showReduceSpeedField: boolean;
  resourceDownTimePlansTable: any;
  startTime: any;
  endTime: any;
  addNewPostForm: FormGroup;
  loadonDelete: boolean = false;

  // time

  constructor(private builder: FormBuilder ,private modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private _PalnService:PalnService ,
    private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.basicModalCode = basicModal;
    this.CerateForm()
    this.getFactory()
    this.GetAllStopsAllTime()
      this.TimeLineChartOptionsL = getTimeLineChartOptions(
      this.obj,
    );
  }
  CerateForm(){
    this.addNewPostForm = new FormGroup({
      id:new FormControl(0, ),
      mainReason:new FormControl(''),
      subReason:new FormControl(''),
      factory:new FormControl(''),
      lineNumber:new FormControl(0),
      mainReasonId: new FormControl(null, [Validators.required]),
      subReasonId: new FormControl(0, []),
      factoryId: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      lineId: new FormControl(null, [Validators.required]),
    });
  }
  postform(){
  let obj = Object.assign({},this.addNewPostForm.value)
  console.log(this.addNewPostForm.value)
  this._PalnService.PostresourceDownTimePlans(obj).subscribe((data:any)=>{
    this.toastr.success(data.message)
    this.addNewPostForm.get("mainReasonId")?.reset()
    this.addNewPostForm.get("subReasonId")?.reset()
    this.addNewPostForm.get("factoryId")?.reset()
    this.addNewPostForm.get("startTime")?.reset()
    this.addNewPostForm.get("endTime")?.reset()
    this.addNewPostForm.get("lineId")?.reset()
    this.GetAllStopsAllTime()
  }, (err:any)=>{
    this.toastr.error(err.message)
  })
  }
  selectToday(): void {
    this.selectedDate = this.calendar.getToday()
  }
  getFactory(){
    this._PalnService.Factories().subscribe((data)=>{
      this.FactoriesDropDown = data;
      this.selectedplant = data[0].id
      this.lineID(this.selectedplant)
    })
  }
  GetAllStopsAllTime(){
    this._PalnService.GetAllStopsAllTime().subscribe(data=> this.resourceDownTimePlansTable  = data)
  }
  lineID(id:any){
    this.FactoriesDropDown.filter((e:any)=>{
      if (id == e.id ) {
        this.FactoryName = e.name
      }
    })
    if(id != null){
      this._PalnService.Lines(id).subscribe((data)=>{
        this.LineDropDown = data;
        this.selectedLine = data[0].id
        this.GetMachine(this.selectedLine)
      })
    }

  }
  GetMachine(id:any){
    if(id != null){
      this._PalnService.Machine(id).subscribe((data)=> this.MachineDropDown = data)
    }
  }
  GetAllMainReasons(){
    this.addNewPostForm.get("subReasonId")?.reset()
    this._PalnService.GetAllMainReasons().subscribe((data:any) => {
      this.MainReasonValue = data
    } )
  }
  GetAllsubReasons(id:any){
    if(id != null){
      this._PalnService.GetAllsubReasons(id).subscribe((data:any) => this.subReasonDropDownValue = data)

    }
  }
  resourceDownTimePlans(date:any){
    this.resourceDownTimePlansTable = []
    date =  new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day + 1).toISOString()
    this._PalnService.resourceDownTimePlans(date).subscribe((data:any) => this.resourceDownTimePlansTable = data)
  }
  openBasicModal(content: TemplateRef<any>,formVale:any) {
    this.OpenEditForm(formVale)
    console.log(formVale,"amoraaa")
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result;
      this.OnEdit(formVale.id,this.addNewPostForm.value)
    }).catch((res) => {});
  }

  delete(id:any,date:any){
    this.loadonDelete = true
      this._PalnService.DeleteresourceDownTimePlans(id).subscribe((data:any)=>{
        this.toastr.error(data.message)
        setTimeout(() => {
          this.loadonDelete= false
        }, 1000);
        this.GetAllStopsAllTime()

      });
  }
  OnEdit(id:any,formObj:any){
    this._PalnService.EditresourceDownTimePlans(id,formObj).subscribe((data:any)=>{
      this.toastr.info(data.message)
      this.addNewPostForm.get("mainReasonId")?.reset()
      this.addNewPostForm.get("subReasonId")?.reset()
      this.addNewPostForm.get("factoryId")?.reset()
      this.addNewPostForm.get("startTime")?.reset()
      this.addNewPostForm.get("endTime")?.reset()
      this.addNewPostForm.get("lineId")?.reset()
      this.GetAllStopsAllTime()
    })
  }
  OpenEditForm(form:any){
    this._PalnService.GetPlanById(form.id).subscribe((data:any)=>{
      this.GetAllMainReasons();
      this.GetAllsubReasons(data.mainReasonId)
      this.lineID(data.factoryId)
      this.GetMachine(data.lineId)
      this.addNewPostForm.controls['id'].setValue(0);
      this.addNewPostForm.controls['mainReason'].setValue('');
      this.addNewPostForm.controls['subReason'].setValue('');
      this.addNewPostForm.controls['factory'].setValue('');
      this.addNewPostForm.controls['lineNumber'].setValue(0);
      this.addNewPostForm.controls['mainReasonId'].setValue(data.mainReasonId);
      this.addNewPostForm.controls['subReasonId'].setValue(data.subReasonId);
      this.addNewPostForm.controls['factoryId'].setValue(data.factoryId);
      this.addNewPostForm.controls['startTime'].setValue(data.startTime);
      this.addNewPostForm.controls['endTime'].setValue(data.endTime);
      this.addNewPostForm.controls['lineId'].setValue(data.lineId);
    })
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
              new Date('2019-03-08').getTime()
            ]
          },


        ]
      },
        {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime()
            ]
          },

        ]
      },

    ],
      chart: {
      height: 150,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%'
      }
    },
    xaxis: {
      type: 'datetime'
    },
    stroke: {
      width: 1
    },
    fill: {
      type: 'solid',
      opacity: 0.6
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  }
};
