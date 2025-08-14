import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { factory, Line, Skus } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import { MachineService } from '../../services/machine.service';
import { IShift, Machine } from '../../models/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-machine-settings',
  templateUrl: './machine-settings.component.html',
  styleUrls: ['./machine-settings.component.scss'],
})
export class MachineSettingsComponent implements OnInit {
  show: boolean = false;
  ShiftList: IShift[];
  Sku: any;
  skuSelected: any;
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  LineDropDown1: Line[];
  selectedFactory1: number;
  selectedFactory2: number;
  selectedDuration: string | null;
  selectedFactory: number;
  selectedLine: number;
  selectedLine1: number;
  selectedLine2: number;
  machineForm: FormGroup;
  FilterForm: FormGroup;
  machineFormEdit: FormGroup;
  machines: Machine[];
  Skus: Skus[];
  accessToFactories: boolean = true;
  isUser: boolean = true;

  constructor(
    private _fp: FormBuilder,
    private _appService: AppService,
    private _machineService: MachineService,
    private _modalService: NgbModal,
    private _toastr: ToastrService
  ) {}

  createForm() {
    this.FilterForm = this._fp.group({
      factoryId: [],
      lineID: [, [Validators.required]],
    });
  }

  creatPostForm() {
    this.machineForm = this._fp.group({
      name: [],
      faunctionality: [],
      ratedSpeed: [],
      factory: [],
      lineId: [],
      uid: [],
      unitOfSpeed: [],
      building: [],
      floor: [],
      room: [],
    });
  }

  creatPutForm() {
    this.machineFormEdit = this._fp.group({
      id: [0],
      name: [],
      faunctionality: [],
      ratedSpeed: [],
      factory: [],
      lineId: [],
      uid: [],
      unitOfSpeed: [],
      building: [],
      floor: [],
      room: [],
    });
  }

  getAllFactories() {
    if (localStorage.getItem('Claims') == 'HasAccessToE2') {
      this.selectedFactory = 3;
      this.selectedFactory2 = 3;
      this.selectedFactory1 = 3;
      this.line(3);
      this.accessToFactories = false;
    } else if (localStorage.getItem('Claims') == 'HasAccessToE1') {
      this.selectedFactory = 2;
      this.selectedFactory1 = 2;
      this.selectedFactory2 = 2;
      this.line(2);
      this.accessToFactories = false;
    } else {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    }
  }

  line(factoryId: number) {
    this._appService.GetFactoryLines(factoryId).subscribe((data) => {
      this.LineDropDown = data;
      data.unshift({
        name: 'All Lines',
        number: 5,
        type: null,
        factoryId: 0,
        id: 0,
      });
    });
  }

  lineForm(factoryId: number) {
    if (factoryId) {
      this._appService.GetFactoryLines(+factoryId).subscribe((data) => {
        this.LineDropDown1 = data;
      });
    } else {
      if (localStorage.getItem('Claims') == 'HasAccessToE2') {
        factoryId = 3;
        this.accessToFactories = false;
      } else if (localStorage.getItem('Claims') == 'HasAccessToE1') {
        factoryId = 2;
        this.accessToFactories = false;
      }
      this._appService.GetFactoryLines(factoryId).subscribe((data) => {
        this.LineDropDown1 = data;
      });
    }
  }

  filterBTN() {
    localStorage.setItem(
      'MachineStatefactory',
      String(this.FilterForm.value.factoryId)
    );
    localStorage.setItem(
      'MachineStateline',
      String(this.FilterForm.value.lineID)
    );

    this.GetLineMachines(+this.selectedLine!);
    this.createForm();
  }

  GetLineMachines(selectedLine: number) {
    this._machineService
      .GetLineMachines(+this.selectedLine!)
      .subscribe((data) => {
        this.machines = data;
      });
  }

  getAllMachines() {
    this._machineService.getAllMachines().subscribe((data) => {
      this.machines = data;
    });
  }

  openLg(content: any, id: number) {
    this.creatPutForm();

    this._machineService.GetMachineById(id).subscribe((data) => {
      this.selectedFactory2 = data.factoryId;
      this.lineForm(this.selectedFactory2);
      this.selectedLine2 = data.lineId;
      this.machineFormEdit.setValue({
        id: data.id,
        name: data.name,
        faunctionality: data.faunctionality,
        ratedSpeed: data.ratedSpeed,
        uid: data.uid,
        unitOfSpeed: data.unitOfSpeed,
        building: data.building,
        floor: data.floor,
        room: data.room,
        lineId: data.lineId,
        factory: data.factoryId,
      });
      this._modalService.open(content, { size: 'lg' });
    });
  }

  openAddForm(content: any) {
    this.creatPostForm();
    this._modalService.open(content, { size: 'lg' });
  }

  add() {
    this._machineService
      .InsertMachine(this.machineForm.value)
      .subscribe((data) => {
        this.getAllMachines();
      });
  }

  upDate() {
    this._machineService
      .UpdateMachine(this.machineFormEdit.value)
      .subscribe((data) => {
        if (
          localStorage.getItem('MachineStatefactory') &&
          localStorage.getItem('MachineStateline')
        ) {
          this.line(Number(localStorage.getItem('MachineStatefactory')));
          this.selectedFactory = Number(
            localStorage.getItem('MachineStatefactory')
          );
          this.selectedLine = Number(localStorage.getItem('MachineStateline'));
          this.GetLineMachines(+this.selectedLine!);
          this._toastr.info('Updated');
        } else {
          this.getAllMachines();
          this._toastr.info('Updated');
        }
      });
  }

  delete(machine: Machine) {
    this._machineService.RemoveMachine(machine).subscribe((data) => {
      this.getAllMachines();
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('Role') == 'User') {
      this.isUser = false;
    }
    this.createForm();
    this.getAllFactories();
    // if (
    //   localStorage.getItem('MachineStatefactory') &&
    //   localStorage.getItem('MachineStateline')
    // ) {
    //   this.line(Number(localStorage.getItem('MachineStatefactory')));
    //   this.selectedFactory = Number(
    //     localStorage.getItem('MachineStatefactory')
    //   );
    //   this.selectedLine = Number(localStorage.getItem('MachineStateline'));
    //   this.GetLineMachines(+this.selectedLine!);
    // } else {
    //   this.getAllMachines();
    // }
  }
}
