import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith } from 'rxjs';
import { AppServiceService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-line-view',
  templateUrl: './line-view.component.html',
  styleUrls: ['./line-view.component.scss']
})
export class LineViewComponent implements OnInit {
  FactoryName: any;
  sucess:any
  lineContainer:any
  cache_key:string = "CashedDataLine";
  Placeholder:boolean =true
  constructor(private _ActivatedRoute:ActivatedRoute,public _Router:Router,private _AppServiceService:AppServiceService) { }
  ngOnInit() {
    this.FactoryName  = this._ActivatedRoute.snapshot.params["FName"]
    this._AppServiceService.GetLineView(this.FactoryName).pipe(
      // startWith(JSON.parse(localStorage[this.cache_key] || "[]")),
    ).subscribe((data:any)=>{
      this.Placeholder = false
      // localStorage[this.cache_key] = JSON.stringify(data)
      this.sucess = data.sucess;
      if(this.sucess){
        this.lineContainer = data.data
      }
      else{
        this.lineContainer = []
      }
    }
     )

    }

  gotoLine(FactoryName:any,line:any){
    this._Router.navigate([`/Tree-veiw/Line-Details/${FactoryName}/${line}`])
    console.log(FactoryName,line)
  }
}
