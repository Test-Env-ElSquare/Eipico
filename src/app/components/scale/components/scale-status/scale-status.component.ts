import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScaleService } from '../../services/scale.service';
import { ActivatedRoute } from '@angular/router';
import { Rooms } from '../../model/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app-Service.service';
import { factory } from 'src/app/core/models/filter';
import { data } from 'jquery';
@Component({
  selector: 'app-scale-status',
  templateUrl: './scale-status.component.html',
  styleUrls: ['./scale-status.component.scss'],
})
export class ScaleStatusComponent implements OnInit {
  selectedFactory: number;
  FactoriesDropDown: factory[];
  scaleRoom: Rooms[];
  rooms: { name: string; value: number }[] = [];

  constructor(
    private _modalService: NgbModal,
    private _scaleSirvice: ScaleService,
    private _appService: AppService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllFactories();
  }

  getAllFactories() {
    this._appService.GetAllFactories().subscribe({
      next: (res) => {
        this.FactoriesDropDown = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllRoomsById(factoryId: number) {
    this._scaleSirvice.getRoomsById(factoryId).subscribe({
      next: (res) => {
        for (let i = 0; i < res; i++) {
          this.rooms[i] = { name: `Room ${i + 1}`, value: i + 1 };
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
