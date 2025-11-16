import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoricalDashboardService } from '../../services/historical-dashboard.service';
import { factory, Line } from 'src/app/core/models/filter';
import { AppService } from 'src/app/core/services/app-Service.service';
import { ToastrService } from 'ngx-toastr';
import { startWith } from 'rxjs';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy, AfterViewInit {
  //output event that pass to the parent
  //@Output() filterEvent = new EventEmitter<Historical>();
  @Output() parts = new EventEmitter<number | boolean>();
  @Output() filterValues = new EventEmitter<{
    shiftFilterid: number;
    selectedFactory: number;
    selectedLine: number;
    from?: string;
    to?: string;
  }>();
  factorybreadcrumb: string | undefined;
  Linebreadcrumb: string | number | undefined;
  Durationbreadcrumb: string | undefined;
  FilterForm: FormGroup;
  shiftFilterid: number = 0;
  liveConnected: boolean = false;
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  DurationDropDown: { name: string; id: number }[];
  selectedDuration: string = '0';
  selectedFactory: number = 2;
  selectedLine: number = 3;
  accessToFactories: boolean = true;
  lastDay: string = '';
  minDate: string = '';
  today: Date = new Date();
  nextDay: string = '';
  customBtnClicked: boolean = false;
  toDate: string = '';

  disableSearchBtn: boolean = false; //true

  constructor(
    public _historicalService: HistoricalDashboardService,
    public _authService: AuthService,
    private _appService: AppService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef
  ) {}

  createForm() {
    this.FilterForm = this._fb.group({
      factoryId: [, [Validators.required]],
      lineID: [, [Validators.required]],
      // from: [],
      // to: [],
    });
  }

  onFromDateChange(selectedDate: string): void {
    this.lastDay = selectedDate;
  }

  //get all factories
  GetAllFactories() {
    if (
      this._authService.isHasAccessToE2() &&
      this._authService.isHasAccessToE1()
    ) {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
        this.accessToFactories = true;
        this.factorybreadcrumb = this.FactoriesDropDown.find(
          (x) => this.selectedFactory == x.id
        )?.name;
      });
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedFactory = 2;
      this.factorybreadcrumb = 'EIPICO1';
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedFactory = 3;
      this.selectedLine = 29;
      this.factorybreadcrumb = 'EIPICO2';
      this.accessToFactories = false;
    }

    console.log('factory');
  }

  searchByCustomDuration() {
    this.customBtnClicked = !this.customBtnClicked;
  }

  //get Duration
  //equal DurationDropDown with response to fill the dropdown select option
  getDurationDropDown() {
    this.DurationDropDown = this._appService.getDurationDropDown();
  }

  //get line by selected factory id
  //equal LineDropDown with response to fill the dropdown select option
  GetFactoryLines(factoryId: number) {
    this._appService.GetFactoryLines(+factoryId).subscribe((data) => {
      this.LineDropDown = data;
      this.Linebreadcrumb = this.LineDropDown.find(
        (x) => this.selectedLine == x.id
      )?.name;
    });
  }

  filterBTN(
    selectedFactory: number,
    selectedLine: number,
    Duration: number,
    from?: string,
    to?: string
  ) {
    let filterObj = {
      shiftFilterid: Duration,
      selectedFactory: selectedFactory,
      selectedLine: selectedLine,
      from: from,
      to: to,
    };
    if (this.liveConnected) {
      this._historicalService.hubConnection.stop();
    }

    this.filterValues.emit(filterObj);
    this.Linebreadcrumb = this.LineDropDown?.find(
      (x) => selectedLine == x.id
    )?.name;
    this.factorybreadcrumb = this.FactoriesDropDown?.find(
      (x) => selectedFactory == x.id
    )?.name;
    this.Durationbreadcrumb = this.DurationDropDown?.find(
      (x) => Duration == x.id
    )?.name;
    startWith(null);
    //this.disableSearchBtn = true
    if (Duration === 0) {
      this.liveConnected = true;
    } else if (Duration !== 0 && this.liveConnected) {
      this.stopCon();
    }
  }

  stopCon() {
    if (this.liveConnected) {
      this._historicalService.hubConnection.stop();
      this.liveConnected = false;
    }
  }

  //to set default value to the user
  setDefault() {
    this.GetFactoryLines(this.selectedFactory);
    this.FilterForm.setValue({
      factoryId: this.selectedFactory,
      lineID: this.selectedLine,
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.GetAllFactories();
    this.getDurationDropDown();
    this.setDefault();
    this.filterBTN(this.selectedFactory, this.selectedLine, this.shiftFilterid);
  }

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.liveConnected) {
      this.stopCon();
    }
  }
}
