import { Component, OnInit, TemplateRef } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { Line, factory } from 'src/app/core/models/filter';
import { PermissionService } from 'src/app/core/services/permission.service';
import { Permission } from 'src/app/core/models/permission';
import {
  MachineState,
  MachineTag,
  MachineTagProperties,
} from '../../models/machineStatemodel';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/core/services/app-Service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  createAreaSpline,
  createLineChart,
} from 'src/app/core/chartModel/HChart';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-machine-state',
  templateUrl: './machine-state.component.html',
  styleUrls: ['./machine-state.component.scss'],
})
export class MachineStateComponent implements OnInit {
  LineDropDown: Line[];
  FactoriesDropDown: factory[];
  selectedLine: number;
  FilterForm!: FormGroup;
  selectedMachine: number;
  MachineStatus: MachineState[];
  toDate = new Date();
  today = new Date();
  fromDate = new Date();
  MachineTagPropertiesData: MachineTagProperties[];
  MachinetagsData: MachineTag[];
  MachineTagsSpeed: any = [];
  machineName: string;
  count: number;
  columName: string;
  accessToFactories: boolean = true;
  minToDate: any;
  date = new Date();
  // fromDate: Date = new Date();
  maxToDate: Date | undefined;
  // toDate: Date = new Date();
  lastDay: string = '';
  minDate: string = '';
  nextDay: string = '';
  // today: string = '';
  constructor(
    private _machineService: MachinesService,
    private _fb: FormBuilder,
    private _appService: AppService,
    private _authService: AuthService,
    private _modalService: NgbModal,
    private Permission: PermissionService
  ) {}

  ngOnInit(): void {
    this.FilterForm = this._fb.group({
      factoryId: [],
      lineID: [, [Validators.required]],
      form: [, [Validators.required]],
      to: [, [Validators.required]],
    });
    this.onGetAllFactories();
    // debugger;
    // if (
    //   localStorage.getItem('MachineStatefactoryId') &&
    //   localStorage.getItem('MachineStatelineID') &&
    //   localStorage.getItem('MachineStateform') &&
    //   localStorage.getItem('MachineStateto')
    // ) {
    //   this.GetAllLines(Number(localStorage.getItem('MachineStatefactoryId')));
    //   this.selectedMachine = Number(
    //     localStorage.getItem('MachineStatefactoryId')
    //   );
    //   this.selectedLine = Number(localStorage.getItem('MachineStatelineID'));
    //   this.fromDate = new Date(
    //     String(localStorage.getItem('MachineStateform'))
    //   );
    //   this.toDate = new Date(String(localStorage.getItem('MachineStateto')));
    //   this.GetMachineState(+this.selectedLine);
    // }
  }
  onGetAllFactories() {
    this._appService.GetAllFactories().subscribe({
      next: (res) => {
        this.FactoriesDropDown = res;
      },
    });
  }
  GetAllFactories() {
    if (
      (this._authService.isHasAccessToE2() &&
        this._authService.isHasAccessToE1(),
      this.Permission.hasAll([Permission.E1, Permission.E2]))
    ) {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedMachine = 3;
      this.GetAllLines(3);
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedMachine = 2;
      this.GetAllLines(2);
      this.accessToFactories = false;
    }
  }

  GetAllLines(factoryId: number) {
    this._appService
      .GetFactoryLines(factoryId)
      .subscribe((data) => (this.LineDropDown = data));
  }

  // tags basic modal
  TagsBasicModal(
    content: TemplateRef<any>,
    MachineId: string,
    machineName: string
  ) {
    this.machineName = machineName;
    this._machineService.MachineTagProperties(MachineId).subscribe((data) => {
      this.MachineTagPropertiesData = data[0];
    });

    this._modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        this.MachineTagsSpeed = [];
      })
      .catch((res) => {});
  }

  tagsChartBtn(
    ChartPropirty: any,
    chartType: string,
    name: string,
    from: string,
    to: string
  ) {
    this.columName = name;
    if (name == 'State') {
      this._machineService
        .MachineTag(this.machineName, from, to, 0)
        .subscribe((data) => {
          if (data) {
            this.MachinetagsData = data[0];
          }
          let Category = this.MachinetagsData?.map((x) => {
            return new Date(x.timeStamp).toLocaleString();
          });
          let state = this.MachinetagsData.map((x) => {
            return x.state;
          });
          createLineChart({
            id: 'TagsSpeedChart',
            xAxisCategories: Category,
            series: state,
            yAxistext: this.machineName,
            seriesname: name,
          });
        });
    }
    if (name == 'Count') {
      this._machineService
        .MachineTag(this.machineName, from, to, 1)
        .subscribe((data) => {
          if (data) {
            this.MachinetagsData = data[0];
          }
          let sum = 0;
          for (let index = 0; index < this.MachinetagsData.length; index++) {
            sum = sum + this.MachinetagsData[index].count;
          }
          let Category = this.MachinetagsData?.map((x) => {
            return new Date(x.timeStamp).toLocaleString();
          });
          let count = this.MachinetagsData.map((x) => {
            return x.count;
          });
          this.count = sum;
          createAreaSpline({
            id: 'TagsSpeedChart',
            xAxisCategories: Category,
            series: count,
            yAxistext: this.machineName,
            seriesname: name,
          });
        });
    }
    if (name == 'Speed') {
      this._machineService
        .MachineTag(this.machineName, from, to, 2)
        .subscribe((data) => {
          if (data) {
            this.MachinetagsData = data[0];
          }
          let Category = this.MachinetagsData?.map((x) => {
            return new Date(x.timeStamp).toLocaleString();
          });
          let speed = this.MachinetagsData.map((x) => {
            return x.speed;
          });
          createAreaSpline({
            id: 'TagsSpeedChart',
            xAxisCategories: Category,
            series: speed,
            yAxistext: this.machineName,
            seriesname: name,
          });
        });
    }
  }

  //get the machine status by the search
  filterBtn() {
    localStorage.setItem(
      'MachineStatefactoryId',
      String(this.FilterForm.value.factoryId)
    );
    localStorage.setItem(
      'MachineStatelineID',
      String(this.FilterForm.value.lineID)
    );
    localStorage.setItem(
      'MachineStateform',
      String(this.FilterForm.value.form)
    );
    localStorage.setItem('MachineStateto', String(this.FilterForm.value.to));
    this.GetMachineState(+this.selectedLine);
  }

  GetMachineState(selectedLine: number) {
    this._machineService.GetMachineState(selectedLine).subscribe((data) => {
      this.MachineStatus = data[0];
    });
  }
  onFromDateChange(selectedDate: string): void {
    this.lastDay = selectedDate;
  }
}
