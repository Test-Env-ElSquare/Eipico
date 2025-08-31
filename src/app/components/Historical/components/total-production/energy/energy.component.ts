import { Component, Input, OnInit } from '@angular/core';
import { EnergyRefactor } from '../../../models/model';

@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss']
})
export class EnergyComponent{
@Input() energy: EnergyRefactor;

}
