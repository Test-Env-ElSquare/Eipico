import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/core/services/app-Service.service';
import { data } from 'jquery';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-Factory-view',
  templateUrl: './Factory-view.component.html',
  styleUrls: ['./Factory-view.component.scss']
})
export class FactoryViewComponent implements OnInit ,OnDestroy{
  FactoryName: any;
  FactoryContainer:any = [ ];
  sucess: any = false;
  cache_key:string = "CashedDataFactory";
  Placeholder: boolean = true;

  cash:any = true
  constructor(public _Router:Router,private _AppServiceService:AppServiceService) { }
  // GetFactoryView$ = this._AppServiceService.GetFactoryView$
  ngOnInit() {

    this._AppServiceService.GetFactoryView().pipe(
    //  startWith(JSON.parse(localStorage[this.cache_key] ||"[]"))

    ).subscribe((data:any)=>{
      this.Placeholder = false
      this.sucess = data.sucess;
      if(this.sucess){
        this.FactoryContainer = data.data
        // localStorage[this.cache_key] = JSON.stringify(data)
      }
    } )

  }
  gotoLine(FactoryName:any){
    this._Router.navigate([`/Tree-veiw/Line-view/${FactoryName}`])
  }
  ngOnDestroy(): void {
      // localStorage.removeItem(this.cache_key)
  }

}



