import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../service/material.service';
import { sankeyChart } from 'src/app/core/chartModel/HChart';


@Component({
  selector: 'app-material-flow',
  templateUrl: './material-flow.component.html',
  styleUrls: ['./material-flow.component.scss']
})
export class MaterialFlowComponent implements OnInit {

  constructor(private _materialService : MaterialService) { }
  getSankey(){
    this._materialService.GetMatarialFlow().subscribe((data)=>{
      sankeyChart({id:'sankeyChart',titleText:"Material Flow Diagram",series:data[0].data})
    })
  }

  ngOnInit(): void {
    this.getSankey()
  }

}
