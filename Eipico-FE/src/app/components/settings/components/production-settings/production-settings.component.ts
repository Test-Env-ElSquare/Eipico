import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line, factory } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-production-settings',
  templateUrl: './production-settings.component.html',
  styleUrls: ['./production-settings.component.scss']
})
export class ProductionSettingsComponent implements OnInit {
  show:boolean = false;
  numOfShifts:any;
  FactoriesDropDown: factory[] ;
  LineDropDown: Line[] ;
  selectedFactory: number;
  selectedLine: string | null;
  FilterForm:FormGroup

  constructor(
    private _appService:AppService,
    private _fb:FormBuilder
    ) { }

    createForm(){
      this.FilterForm = this._fb.group({
        factoryId:[,[Validators.required]],
        lineID:[,[Validators.required]],
      })
    }

  getFactories(){
    this._appService.GetAllFactories().subscribe(data=>{
      this.FactoriesDropDown = data
    })
  }

  getLines(factoryId:number){
    this._appService.GetFactoryLines(factoryId).subscribe((data)=>{
      this.LineDropDown = data
    })
  }

  filterBTN(){

  }

  ngOnInit(): void {
    this.getFactories()
    this.createForm()
  }

}
