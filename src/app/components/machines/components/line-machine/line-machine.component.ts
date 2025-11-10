import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Line, factory } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import { MachinesService } from '../../services/machines.service';
import { GetLineMachines } from '../../models/lineMachineModel';
import { AuthService } from 'src/app/core/services/Auth.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { Permission } from 'src/app/core/models/permission';

@Component({
  selector: 'app-line-machine',
  templateUrl: './line-machine.component.html',
  styleUrls: ['./line-machine.component.scss'],
})
export class LineMachineComponent implements OnInit {
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  FilterForm: FormGroup;
  selectedFactory: number;
  selectedLine: string | null;
  getLineMachines: GetLineMachines[];
  accessToFactories: boolean = true;

  constructor(
    private _appService: AppService,
    private _fb: FormBuilder,
    private _machinebyLine: MachinesService,
    private _authService: AuthService,
    private Permission: PermissionService
  ) {}

  createForm() {
    this.FilterForm = this._fb.group({
      factoryId: [],
      lineID: [, [Validators.required]],
    });
  }

  //get all factories
  //equal FactoriesDropDown with response to fill the dropdown select option
  GetAllFactories() {
    if (
      // this._authService.isHasAccessToE2() &&
      // this._authService.isHasAccessToE1()
      this.Permission.hasAll([Permission.E1, Permission.E2])
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

  //get line by selected factory id
  //equal LineDropDown with response to fill the dropdown select option
  GetFactoryLines(factoryId: number) {
    this._appService.GetFactoryLines(factoryId).subscribe((data) => {
      this.LineDropDown = data;
    });
  }

  filterBTN() {
    this._machinebyLine
      .GetLineMachines(Number(this.selectedLine))
      .subscribe((data) => {
        this.getLineMachines = data;
      });
  }

  ngOnInit(): void {
    this.createForm();
    this.GetAllFactories();
  }
}
