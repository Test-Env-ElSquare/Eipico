import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app-Service.service';
import { factory, Line } from 'src/app/core/models/filter';
import { ScadaService } from '../../service/scada.service';
import { scada } from '../../models/model';
import { radialBarChartFunc } from 'src/app/core/chartModel/apex';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-main-scada',
  templateUrl: './main-scada.component.html',
  styleUrls: ['./main-scada.component.scss'],
})
export class MainScadaComponent implements OnInit {
  FilterForm: FormGroup;
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  selectedFactory: number;
  selectedLine: string | null;
  DurationDropDown: { name: string; id: number }[];
  scada: scada;
  radialChartOptions1: any = {};
  radialChartOptions2: any = {};
  radialChartOptions3: any = {};
  radialChartOptions4: any = {};
  accessToFactories: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _appService: AppService,
    private _scadaService: ScadaService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.GetAllFactories();
  }

  createForm() {
    this.FilterForm = this._fb.group({
      factoryId: [],
      lineID: [, [Validators.required]],
    });
  }

  GetAllFactories() {
    if (
      this._authService.isHasAccessToE2() &&
      this._authService.isHasAccessToE1()
    ) {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedFactory = 3;
      this.GetFactoryLines(3);
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedFactory = 2;
      this.GetFactoryLines(2);
      this.accessToFactories = false;
    }
  }

  GetFactoryLines(factoryId: number) {
    this._appService.GetFactoryLines(factoryId).subscribe((data) => {
      this.LineDropDown = data;
    });
  }

  getDurationDropDown() {
    this.DurationDropDown = this._appService.getDurationDropDown();
  }

  GetScada() {
    this._scadaService.GetScada(+this.selectedLine!).subscribe((data) => {
      this.scada = data[0];
      console.log(data);
      this.radialChartOptions1 = radialBarChartFunc({
        name: 'Performance',
        series: [(Number(this.scada?.lines[0]?.performance) * 100)?.toFixed(2)],
        symbole: ' % ',
      });
      this.radialChartOptions2 = radialBarChartFunc({
        name: 'AVAILABILITY',
        series: [
          (Number(this.scada?.lines[0]?.availability) * 100)?.toFixed(2),
        ],
        symbole: ' % ',
      });
      this.radialChartOptions3 = radialBarChartFunc({
        name: 'OEE',
        series: [(Number(this.scada?.lines[0]?.oee) * 100)?.toFixed(2)],
        symbole: ' % ',
      });
      this.radialChartOptions4 = radialBarChartFunc({
        name: 'QUALITY',
        series: [(Number(this.scada?.lines[0]?.quality) * 100)?.toFixed(2)],
        symbole: ' % ',
      });
    });
  }
}
