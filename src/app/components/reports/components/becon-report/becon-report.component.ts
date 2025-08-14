import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { BykonState, EnergyMachineState } from '../../model/model';
import { MachinesService } from 'src/app/components/machines/services/machines.service';
import { MachineState } from 'src/app/components/machines/models/machineStatemodel';

@Component({
  selector: 'app-becon-report',
  templateUrl: './becon-report.component.html',
  styleUrls: ['./becon-report.component.scss']
})
export class BeconReportComponent implements OnInit {
  toggelToShow :boolean = true
  toggelToHide :boolean = false
  MachineProduction : MachineState[]
  MachineUtilites : EnergyMachineState []
   totalBecons:number
   totalActive:number
   totalInactive:number
  totalBeconsU: number;
  totalActiveU: number;
  totalInactiveU: number;


  constructor(private _reportService : ReportsService, private _machineService:MachinesService) { }

  ngOnInit(): void {
  this.GetBykonState()
  this.GetEnergyMachineState()
  }

   showAndHide(){
     this.toggelToShow = !this.toggelToShow
   }
   hideAndShow(){
     this.toggelToHide = !this.toggelToHide
  }

  GetBykonState(){
    this._machineService.GetMachineState(0).subscribe(
      data=>{
        this.MachineProduction = data[0]
         this.totalBecons = data[0].length
         this.totalActive = this.MachineProduction.filter(x=> x.beacon_Status == 'OnLine').length
         this.totalInactive = this.MachineProduction.filter(x=> x.beacon_Status == 'OffLine').length
      }
    )
  }


  GetEnergyMachineState(){
    this._reportService.EnergyMachineState().subscribe(
      data=>{
        this.MachineUtilites = data
        this.totalBeconsU = data.length
        this.totalActiveU = this.MachineUtilites.filter(x=> x.status == 'ONLINE').length
        this.totalInactiveU = this.MachineUtilites.filter(x=> x.status == 'OFFLINE').length
      }
    )

  }
  }

