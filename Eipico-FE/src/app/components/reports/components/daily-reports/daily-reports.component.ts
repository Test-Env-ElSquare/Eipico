import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line, factory } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import { HistoricalDashobardsPerHour } from '../../model/model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.scss']
})
export class DailyReportsComponent implements OnInit {
  FilterForm: FormGroup;
  FactoriesDropDown: factory[]
  LineDropDown: Line[]
  selectedFactory: string;
  selectedLine: string | null;
  HistoricalDashobardsPerHour:HistoricalDashobardsPerHour[]

  constructor(
    private _appService:AppService,
    private _fb:FormBuilder,
    private _reportsService:ReportsService
  ) { }

  //create filter form with 3 formControl (factoryId , lineID , DurationID)
  createForm(){
    this.FilterForm = this._fb.group({
      factoryId:[,[Validators.required]],
      lineID:[,[Validators.required]],
      date:[,[Validators.required]]
    })
  }

   //get all factories
  //equal FactoriesDropDown with response to fill the dropdown select option
  GetAllFactories(){
    this._appService.GetAllFactories().subscribe(data =>{
      this.FactoriesDropDown = data
    })
  }

   //get line by selected factory id
  //equal LineDropDown with response to fill the dropdown select option
  GetFactoryLines(factoryId:string){
    this._appService.GetFactoryLines(+factoryId).subscribe((data)=>{
      this.LineDropDown = data
    })
  }

  filterBTN(){
    this._reportsService.HistoricalDashobardsPerHour(this.FilterForm.value.factoryId,this.FilterForm.value.lineID,this.FilterForm.value.date).subscribe((data)=>{
      this.HistoricalDashobardsPerHour = data[0].fillers
    })
  }

  ngOnInit(): void {
    this.createForm()
    this.GetAllFactories()
  }

}
