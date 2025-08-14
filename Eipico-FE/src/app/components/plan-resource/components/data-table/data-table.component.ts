import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { factory, Line } from 'src/app/core/models/filter';
import {
  GetAllSubReasons,
  GetStoppagePlan,
  StoppageReasons,
} from '../../models/model';
import { PlanResouceService } from '../../services/plan-resouce.service';
import { AppService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  //input from parent
  @Input() newObj: GetStoppagePlan;
  resourceDownTimePlansTable: GetStoppagePlan[];
  date: { year: number; month: number };
  editDowntimePlanningForm: FormGroup;
  basicModalCloseResult: string = '';
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  selectedplant: number;
  selectedplant1: number;
  selectedLine: number;
  Starttime: string;
  Endtime: string;
  loadonDelete: boolean = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  id: number;
  dates: string;
  selectedDate: NgbDateStruct;
  stoppageReasons: StoppageReasons[];
  getAllSubReasons: GetAllSubReasons[];
  selectedResons: number;
  selectedSubResons: number;

  constructor(
    private _planResource: PlanResouceService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _appServices: AppService,
    private _toastr: ToastrService
  ) {}

  //open modal
  openBasicModal(content: TemplateRef<any>, formVale: any) {
    this.OpenEditForm(formVale);
    this._modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
        this.basicModalCloseResult = 'Modal closed' + result;
      })
      .catch((res) => {});
  }

  //open edit form
  //get data from backend
  //set form value from returned response from backend
  OpenEditForm(form: any) {
    if (form.id) {
      this._planResource.GetStoppagePlanById(form.id).subscribe((data) => {
        this.lineID(data.factoryId);
        this.GetAllSubReasons(data.reasonId);
        this.editDowntimePlanningForm.patchValue({
          id: data.id,
          reasonId: data.reasonId,
          subReasonId: data.subReasonId,
          factoryId: data.factoryId,
          lineId: data.lineId,
          startTime: data.startTime,
          endTime: data.endTime,
        });
      });
    }
  }

  //send data to the backend with the edited value
  OnEdit() {
    this._planResource
      .UpdateStoppagePlan(this.editDowntimePlanningForm.value)
      .subscribe((data: any) => {
        this._toastr.info('Updated');
        this.GetAllStopsAllTime();
      });
  }

  //GetAllStopsAllTime
  GetAllStopsAllTime() {
    this._planResource.GetAllStoppagePlans().subscribe((data) => {
      this.resourceDownTimePlansTable = data;
      this.count = data.length;
    });
  }

  //get all factories
  getFactory() {
    this._appServices.GetAllFactories().subscribe((data) => {
      this.FactoriesDropDown = data;
    });
  }

  //get lines by factory id
  lineID(id: number) {
    this._appServices.GetFactoryLines(+id).subscribe((data) => {
      this.LineDropDown = data;
    });
  }

  //delete selected item and send request to the backend
  //open toastr on success
  delete(item: GetStoppagePlan) {
    this.loadonDelete = true;
    this._planResource.RemoveStoppagePlan(item).subscribe((data: any) => {
      this._toastr.error('Deleted');
      setTimeout(() => {
        this.loadonDelete = false;
      }, 1000);
      this.GetAllStopsAllTime();
    });
  }

  //create edit form
  createForm() {
    this.editDowntimePlanningForm = this._fb.group({
      id: [0],
      reasonId: [''],
      subReasonId: [''],
      factoryId: [''],
      lineId: [0],
      day: [null, [Validators.required]],
      startTime: [0, []],
      endTime: [null, [Validators.required]],
    });
  }

  //pagenation
  onTableDataChange(event: any): void {
    this.page = event;
    if (this.selectedDate !== undefined && this.selectedplant !== undefined) {
      this.resourceDownTimePlans(this.selectedDate, +this.selectedplant);
    } else {
      this.GetAllStopsAllTime();
    }
  }

  //get the id of the selected item
  getId(id: number) {
    return (this.id = id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetAllStopsAllTime();
  }
  resourceDownTimePlans(date: NgbDateStruct, factoryId: number) {
    let dates = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day + 1
    ).toISOString();
    this._planResource
      .GetAllStoppagePlans(factoryId, dates)
      .subscribe((data: any) => {
        this.resourceDownTimePlansTable = data;
        this.count = data.length;
      });
  }

  StoppageReasons() {
    this._planResource.StoppageReasons().subscribe((data) => {
      this.stoppageReasons = data;
    });
  }

  GetAllSubReasons(id: number) {
    this._planResource.GetAllSubReasons(id).subscribe((data) => {
      this.getAllSubReasons = data;
    });
  }

  ngOnInit(): void {
    this.getFactory();
    this.createForm();
    this.GetAllStopsAllTime();
    this.StoppageReasons();
  }
}
