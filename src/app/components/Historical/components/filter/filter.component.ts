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
  factoriesListDown: factory[];
  factoriesList: factory[];
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

  disableSearchBtn: boolean = false;

  constructor(
    public _historicalService: HistoricalDashboardService,
    public _authService: AuthService,
    private _appService: AppService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.createForm();

    // this.onGetAllFactories();
    this.getAllFactories();
    this.getDurationDropDown();
    this.setDefault();
    this.FilterForm.get('factoryId')?.valueChanges.subscribe((value) => {
      this.selectedFactory = value;
    });

    this.FilterForm.get('lineID')?.valueChanges.subscribe((value) => {
      this.selectedLine = value;
    });
    this.filterBTN(this.shiftFilterid);
  }

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
  // onGetAllFactories() {
  //   this._appService.GetAllFactories().subscribe((data) => {
  //     this.FactoriesDropDown = data;
  //     console.log('facroriesDropDown:', this.FactoriesDropDown);
  //     this.accessToFactories = true;

  //     // default factory
  //     // if (!this.selectedFactory) {
  //     //   this.selectedFactory = data[0].id;
  //     // }

  //     // patch form now (AFTER items loaded)
  //     this.FilterForm.patchValue({
  //       factoryId: this.selectedFactory,
  //     });

  //     // load lines for default factory
  //     this.GetFactoryLines(this.selectedFactory);

  //     // listen to changes on factory select
  //     this.FilterForm.get('factoryId')?.valueChanges.subscribe(
  //       (factoryId: number) => {
  //         console.log('Factory changed to:', factoryId);
  //         this.selectedFactory = factoryId;

  //         this.GetFactoryLines(factoryId);

  //         this.factorybreadcrumb = this.FactoriesDropDown.find(
  //           (f) => f.id === factoryId
  //         )?.name;

  //         // emit filter values
  //         this.filterValues.emit({
  //           shiftFilterid: this.shiftFilterid,
  //           selectedFactory: this.selectedFactory,
  //           selectedLine: this.selectedLine,
  //         });
  //       }
  //     );

  //     // update breadcrumb for default
  //     this.factorybreadcrumb = this.FactoriesDropDown.find(
  //       (f) => f.id === this.selectedFactory
  //     )?.name;
  //   });
  // }
  getAllFactories() {
    this._appService.GetAllFactories().subscribe({
      next: (res) => {
        this.factoriesListDown = res;
        console.log(res);
      },
    });
  }
  GetFactoryLines(factoryId: number) {
    this._appService.GetFactoryLines(+factoryId).subscribe({
      next: (res) => {
        this.LineDropDown = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  searchByCustomDuration() {
    this.customBtnClicked = !this.customBtnClicked;
  }

  getDurationDropDown() {
    this.DurationDropDown = this._appService.getDurationDropDown();
  }

  filterBTN(Duration: number, from?: string, to?: string) {
    const selectedFactory = this.FilterForm.get('factoryId')?.value;
    const selectedLine = this.FilterForm.get('lineID')?.value;

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

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.liveConnected) {
      this.stopCon();
    }
  }
}
