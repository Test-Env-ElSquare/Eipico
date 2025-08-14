import { Component, OnInit } from '@angular/core';
import { factoryProduction } from './models/model';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {
  eurValue : factoryProduction[];
  constructor() { }
  eur(factoryProduction:factoryProduction[]){
    this.eurValue = factoryProduction
  }
  ngOnInit(): void {
  }

}
