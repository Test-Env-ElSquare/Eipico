import { Component, OnInit } from '@angular/core';
import { LinesService } from '../../services/lines.service';
import { lineS } from '../../models/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { factory } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-line-settings',
  templateUrl: './line-settings.component.html',
  styleUrls: ['./line-settings.component.scss']
})
export class LineSettingsComponent implements OnInit {
  lineForm : FormGroup;
  lineEditForm : FormGroup;
  lines:lineS[];
  FactoriesDropDown: factory[];
  selectedFactory: string;

  constructor(
    private _lineService:LinesService,
    private _appService:AppService,
    private _modalService: NgbModal,
    private _fp:FormBuilder,
    private _toastr: ToastrService
  ) { }

  creatPostForm(){
    this.lineForm = this._fp.group({
      name:[],
      number:[],
      type:[],
      factoryId:[],
      id:[0]
    })
  }

  creatPutForm(){
    this.lineEditForm = this._fp.group({
      name:[],
      number:[],
      type:[],
      factoryId:[],
      id:[0]
    })
  }

  getAllLines(){
    this._lineService.GetAllLines().subscribe((data)=>{
      this.lines = data
    })
  }

  getAllFactories(){
    this._appService.GetAllFactories().subscribe((data)=>{
      this.FactoriesDropDown = data
    })
  }

  openAddForm(content:any) {
    this.creatPostForm()
		this._modalService.open(content, { size: 'lg' });
	}

  add(){
    this._lineService.InsertLine(this.lineForm.value).subscribe((data)=>{
      this._toastr.success('Added')
      this.getAllLines()
    })
  }

  openLg(content:any,id:number) {
    this.creatPutForm()
    this.getAllFactories()
    this._lineService.GetLine(id).subscribe((data)=>{
      this.lineEditForm.setValue({
        id:data.id,
        name:data.name,
        number:data.number,
        type:data?.type,
        factoryId:data.factoryId
      })
      this._modalService.open(content, { size: 'lg' });
    })

	}

  upDate(){
    this._lineService.UpdateLine(this.lineEditForm.value).subscribe((data)=>{
      this._toastr.info('Updated')
      this.getAllLines()
    })
  }

  delete(line:lineS){
    this._lineService.RemoveLine(line).subscribe((data)=>{
      this._toastr.error('Deleted')
      this.getAllLines()
    })
  }

  ngOnInit(): void {
    this.getAllLines()
    this.getAllFactories()
  }

}
