import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { factory, Line } from 'src/app/core/models/filter';
import { GetAllSubReasons, GetStoppagePlan, StoppageReasons } from '../../models/model';
import { PlanResouceService } from '../../services/plan-resouce.service';
import { AppService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
//send output to the parent
  @Output() newDowntimePlanningEvent = new EventEmitter<GetStoppagePlan>();
  addNewDowntimePlanningForm:FormGroup
  FactoriesDropDown:factory[];
  LineDropDown:Line[];
  selectedplant:string;
  selectedResons:number;
  selectedSubResons:number;
  selectedLine:number;
  Starttime:string;
  Endtime:string;
  stoppageReasons:StoppageReasons[]
  getAllSubReasons:GetAllSubReasons[]

  constructor(
    private _fb:FormBuilder,
    private _appServices:AppService,
    private _planResource:PlanResouceService,
    private _toastr: ToastrService
  ) { }

  //get all factories
  getFactory(){
    this._appServices.GetAllFactories().subscribe((data)=>{
      this.FactoriesDropDown = data

    })
  }

  //get all lines of specific factory
  lineID(id:string){
    this._appServices.GetFactoryLines(+id).subscribe(data=>{
      this.LineDropDown = data
    })
  }

  //create add form
  createForm(){
    this.addNewDowntimePlanningForm = this._fb.group({
      id: [0],
      reasonId: [''],
      subReasonId:[''],
      factoryId: [null,[Validators.required]],
      lineId: [null,[Validators.required]],
      startTime: [null,[Validators.required]],
      endTime: [null,[Validators.required]],
    })
  }

  //send form value to the backend
  //open toastr
  postform(){
    console.log(this.addNewDowntimePlanningForm.value)
    this._planResource.add(this.addNewDowntimePlanningForm.value).subscribe((data:any)=>{
      this._toastr.success('Added')
      this.addNewDowntimePlanningForm.get("reason")?.reset()
      this.addNewDowntimePlanningForm.get("factoryId")?.reset()
      this.addNewDowntimePlanningForm.get("lineId")?.reset()
      this.addNewDowntimePlanningForm.get("startTime")?.reset()
      this.addNewDowntimePlanningForm.get("endTime")?.reset()
      this.addNewDowntimePlanningForm.get("reasonId")?.reset()
      this.addNewDowntimePlanningForm.get("subReasonId")?.reset()
      this.newDowntimePlanningEvent.emit(this.addNewDowntimePlanningForm.value)
    }, (err:any)=>{
      this._toastr.error('something went')
    })
    }

  StoppageReasons(){
    this._planResource.StoppageReasons().subscribe((data)=>{
      this.stoppageReasons = data
    })
  }

  GetAllSubReasons(id:number){
    this._planResource.GetAllSubReasons(id).subscribe((data)=>{
      this.getAllSubReasons = data
    })
  }

  ngOnInit(): void {
    this.createForm()
    this.getFactory()
    this.StoppageReasons()
  }

}
