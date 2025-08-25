import { Component, Input, OnInit } from '@angular/core';
import { fillers } from '../../../models/model';

@Component({
  selector: 'app-filler-speed',
  templateUrl: './filler-speed.component.html',
  styleUrls: ['./filler-speed.component.scss']
})
export class FillerSpeedComponent {
  @Input() filler: fillers;

}
