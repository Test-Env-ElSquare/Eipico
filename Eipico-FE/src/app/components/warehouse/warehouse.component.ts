import { Component, OnInit } from '@angular/core';
import { sankeyChart } from 'src/app/core/chartModel/HChart';
import { WarehouseService } from './services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  allBatchNames:{ label: string; value: string; }[];
  selectedBatch:string
  constructor(private _warehouse:WarehouseService) { }

  //get all batchs name
  GetAllBatchName(){
    this._warehouse.GetAllBatchName().subscribe((data) => {
      this.allBatchNames = this.format(data)
    })
  }

  //format list from backend to use it in ng-select
  //bcz backend only return string[]
  format(batches: any){
    let arr: { label: any; value: any; }[]=[];
    for(let i=0;i< batches.length ; i++){
      arr.push({label: batches[i], value: batches[i]});
    }
     return arr;
  }

  //grew warehouse chart
  getSankey(batchId:string){
    this._warehouse.GetMatarialFlow(batchId).subscribe((data)=>{
      sankeyChart({id:'sankeyChart',titleText:"Material Flow Diagram",series:data[0].data})
    })
  }

  ngOnInit(): void {
    this.GetAllBatchName()
  }

}
