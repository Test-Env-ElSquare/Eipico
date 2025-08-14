import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { factory, Line, Skus } from 'src/app/core/models/filter';
import { PlanProductService } from '../../services/plan-product.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/core/services/app-Service.service';
import { AddProductPlans } from '../../models/model';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  //output paramenter to send data to the parent
  @Output() newPlanProductEvent = new EventEmitter<AddProductPlans>();
  Target: number;
  Starttime: string;
  lineNum: Line[];
  FactoryName: string;
  selectedplant: number;
  selectedShift: string;
  selectedLine: number;
  skus: { name: string; sku: string | null }[];
  addProductPlanningForm: FormGroup;
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  accessToFactories: boolean = true;

  ShiftArr = [
    {
      name: 'Shift 1',
      id: 'Shift1',
    },
    {
      name: 'Shift 2',
      id: 'Shift2',
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _planProduct: PlanProductService,
    private _appService: AppService,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}

  //create add form
  createForm() {
    this.addProductPlanningForm = this._fb.group({
      id: [0],
      factoryId: [null],
      lineId: [null, [Validators.required]],
      day: [null, [Validators.required]],
      skuName: [null, [Validators.required]],
      target: [null, [Validators.required]],
    });
  }

  //get lines by factoryId
  lineID(id: any) {
    this._appService
      .GetFactoryLines(id)
      .subscribe((data) => (this.lineNum = data));
  }

  //get all factories
  getFactory() {
    if (
      this._authService.isHasAccessToE2() &&
      this._authService.isHasAccessToE1()
    ) {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    } else if (this._authService.isHasAccessToE2()) {
      this.selectedplant = 3;
      this.lineID(3);
      this.accessToFactories = false;
    } else if (this._authService.isHasAccessToE1()) {
      this.selectedplant = 2;
      this.lineID(2);
      this.accessToFactories = false;
    }
  }

  getSku() {
    this._appService.GetAllSKUs().subscribe(
      (data) =>
        (this.skus = data.map((x) => {
          if (x.sku != null) {
            return {
              name: x.batch + ' ' + x.sku,
              sku: x.sku,
            };
          } else {
            return {
              name: x.batch,
              sku: x.sku,
            };
          }
        }))
    );
  }

  //send form value to backend
  submit() {
    this._planProduct
      .InsertProductPlan(this.addProductPlanningForm.value)
      .subscribe(
        (data) => {
          this._toastr.success('added');
          this.addProductPlanningForm.get('skuId')?.reset();
          this.addProductPlanningForm.get('factoryId')?.reset();
          this.addProductPlanningForm.get('day')?.reset();
          this.addProductPlanningForm.get('lineId')?.reset();
          this.addProductPlanningForm.get('target')?.reset();
          this.newPlanProductEvent.emit(this.addProductPlanningForm.value);
        },
        (err: any) => {
          this._toastr.error(err.message);
        }
      );
    console.log(this.addProductPlanningForm.value);
  }

  ngOnInit(): void {
    this.createForm();
    this.getFactory();
    this.getSku();
  }
}
