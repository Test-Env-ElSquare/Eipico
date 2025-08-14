import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserFilter } from 'src/app/core/models/filter';
import { AppServiceService } from 'src/app/core/services/app-Service.service';

@Component({
  selector: 'app-DashBoard-details',
  templateUrl: './DashBoard-details.component.html',
  styleUrls: ['./DashBoard-details.component.scss']
})
export class DashBoardDetailsComponent implements OnInit  {
  filter:UserFilter = new UserFilter ();
  FactoriesDropDown: any = [];
  LineDropDown: any = [];
  DurationDropDown:any = [
    {
      name:'Last Shift',
      id:0
    },
    {
      name:'Last day',
      id:1
    },
       {
      name:'Last 7 days',
      id:2
    },
    {
      name:'Last 30 days',
      id:3
    }
  ]
  selectedDuration: any = 1;
  selectedFactory: any= 1;
  selectedLine: any = -1;
  FactoryName: any = "Alex";
  Duration:any;
  selectedDate: NgbDateStruct;
  date: {year: number, month: number};
  currentDate: NgbDateStruct;
  dashboardData?: any = {};
  Placeholder: boolean = true;

  constructor(private calendar: NgbCalendar,private modalService: NgbModal , private router : Router ,private _AppServiceService:AppServiceService,private toastr: ToastrService) { }

  ngOnInit() {

    this.filter
    {
      this.filter.plant = this.FactoryName
      this.filter.line = this.selectedLine
      this.filter.duration = this.selectedDuration
    }
    this.DurationDropDown.filter((e:any)=>{
      if (this.selectedDuration == e.id ) {
        this.Duration = e.name
      }
    })
    this.getFactory()
    this.lineID(1)
    this.GetDashBoradData(this.filter)
    //
  this.currentDate = this.calendar.getToday();
  }
  getFactory(){
    this._AppServiceService.Factories().subscribe((data)=>{
      this.FactoriesDropDown = data;
    })
  }
  lineID(id:any){
    this.selectedLine = null
    this.FactoriesDropDown.filter((e:any)=>{
      if (id == e.id ) {
        this.FactoryName = e.name
      }
    })
      this._AppServiceService.Lines(id).subscribe((data)=>{
        this.LineDropDown = data;
      })

  }
  gitDuration(id:any){
  this.selectedDuration = id
  this.Placeholder = true

  this.filter
    {
      this.filter.plant = this.FactoryName
      this.filter.line = this.selectedLine
      this.filter.duration = this.selectedDuration
    }
        this.DurationDropDown.filter((e:any)=>{
    if (this.selectedDuration == e.id ) {
      this.Duration = e.name
    }

  })
  this.GetDashBoradData(this.filter)
  }

  GetDashBoradData(filter:any){

    this._AppServiceService.dashboard(filter).pipe(

     ).subscribe((data:any)=>{
        this.Placeholder = false
          this.dashboardData = data.data[0][0]
    },



)
  }

}
