import { Component, OnInit } from '@angular/core';
import { GetStoppagePlan } from './models/model';

@Component({
  selector: 'app-plan-resource',
  templateUrl: './plan-resource.component.html',
  styleUrls: ['./plan-resource.component.scss']
})
export class PlanResourceComponent implements OnInit {

  newObj:GetStoppagePlan;
  constructor() { }

  newPostDone(data:GetStoppagePlan){
    return this.newObj = data
  }

  ngOnInit(): void {
  }

}
