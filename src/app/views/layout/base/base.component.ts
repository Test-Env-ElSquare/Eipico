import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit , AfterViewInit{

  isLoading: boolean = true;


  constructor(public router: Router,public LoaderService:LoaderService,private _cdr: ChangeDetectorRef ) {

    // Spinner for lazyload modules
    // router.events.forEach((event) => {
    //   if (event instanceof RouteConfigLoadStart) {
    //     this.isLoading = true;
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //     this.isLoading = false;
    //   }
    // });


  }
  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }
  ngAfterViewChecked(){
    //your code to update the model
    this._cdr.detectChanges();
 }
  ngOnInit(): void {
    this.LoaderService.loader.subscribe(data=>{
      this.isLoading = data
      this.isLoading = !this.isLoading
    })
  }

}
