import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { factory, Line, Skus } from 'src/app/core/models/filter';
import { PlanProductService } from '../../services/plan-product.service';
import { AddProductPlans, GetAllProductPlans } from '../../models/model';
import { AppService } from 'src/app/core/services/app-Service.service';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  //input from parent
  @Input() newObj: AddProductPlans;
  selectedDate: any;
  editProductPlanningForm: FormGroup;
  skuId: { name: string; sku: string | null }[];
  selectedplant: number;
  selectedplant1: number;
  id: number;
  dating: string;
  date: { year: number; month: number };
  basicModalCloseResult: string = '';
  FactoriesDropDown: factory[];
  LineDropDown: Line[];
  getPlanShiftMaterialConsumptions: GetAllProductPlans[];
  lineNum: number;
  FactoryName: string;
  selectedLine: number;
  loadonDelete: boolean = false;
  page: number = 1;
  count: number = 0;
  accessToFactories: boolean = true;
  tableSize: number = 6;

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

  editdate: string;

  constructor(
    private _appService: AppService,
    private _planProductService: PlanProductService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _toastr: ToastrService
  ) {}

  //create the editfrom
  createForm() {
    this.editProductPlanningForm = this._fb.group({
      id: [0],
      factoryId: [null],
      lineId: [null, [Validators.required]],
      day: [null, [Validators.required]],
      skuName: [null, [Validators.required]],
      target: [null, [Validators.required]],
    });
  }

  hasAccessToEditProductionPlan() {
    return this._authService.isHasAccessToProductionPlanAndEdit();
  }

  hasAccessToDeleteProductionPlan() {
    return this._authService.isHasAccessToProductionPlanAndDelete();
  }

  //call back end with the user selected filter
  GetPlanShiftMaterialConsumptionsBySpecificDate(date: any, plant: any) {
    date = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day + 1
    ).toISOString();
    this._planProductService
      .GetAllProductPlans(plant, date)
      .subscribe((data: any) => {
        this.getPlanShiftMaterialConsumptions = data;
        this.count = data.length;
      });
  }

  //get all data without filter
  getAllPaln() {
    this._planProductService.GetAllProductPlans().subscribe((data: any) => {
      this.getPlanShiftMaterialConsumptions = data;
      this.count = data.length;
    });
  }

  //get all factories
  getFactory() {
    if (localStorage.getItem('Claims') == 'HasAccessToE2') {
      this.selectedplant = 3;
      this.lineID(3);
      this.accessToFactories = false;
    } else if (localStorage.getItem('Claims') == 'HasAccessToE1') {
      this.selectedplant = 2;
      this.lineID(2);
      this.accessToFactories = false;
    } else {
      this._appService.GetAllFactories().subscribe((data) => {
        this.FactoriesDropDown = data;
      });
    }
  }

  //get line by factory id
  lineID(id: any) {
    this._appService
      .GetFactoryLines(id)
      .subscribe((data) => (this.LineDropDown = data));
  }

  //open edit form
  //set the value of it to it's original value
  OpenEditForm(form: any) {
    this._planProductService
      .GetPlanShiftMaterialConsumptionsById(form.id)
      .subscribe((data) => {
        this.lineID(data.factoryId);
        this.getSku();
        this.editdate = data.day;
        this.editProductPlanningForm.setValue({
          id: data.id,
          factoryId: data.factoryId,
          lineId: data.lineId,
          day: data.day,
          skuName: data.skuName,
          target: data.target,
        });
      });
  }

  openBasicModal(content: TemplateRef<any>, formVale: any) {
    this.OpenEditForm(formVale);
    this._modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
        this.basicModalCloseResult = 'Modal closed' + result;
      })
      .catch((res) => {});
  }

  //get selected id user choose
  getId(id: number) {
    return (this.id = id);
  }

  //send the edit form value after user the values to backend
  OnEdit() {
    this._planProductService
      .EditPlanShiftMaterialConsumptions(this.editProductPlanningForm.value)
      .subscribe((data: any) => {
        this._toastr.info('Updated');
        this.getAllPaln();
      });
  }

  //delete the selected item by user and send request to backend
  //open toastr when it's deleted to confirme it's deleted
  delete(item: GetAllProductPlans | AddProductPlans) {
    this.loadonDelete = true;
    this._planProductService.RemoveProductPlan(item).subscribe((data: any) => {
      this._toastr.error('Deleted');
      this.getAllPaln();
      setTimeout(() => {
        this.loadonDelete = false;
      }, 2000);
    });
  }

  //pagenation
  onTableDataChange(event: any): void {
    this.page = event;
    if (this.selectedplant !== undefined && this.selectedDate !== undefined) {
      this.GetPlanShiftMaterialConsumptionsBySpecificDate(
        this.selectedDate,
        this.selectedplant
      );
    } else {
      this.getAllPaln();
    }
  }

  getSku() {
    this._appService.GetAllSKUs().subscribe((data) => {
      this.skuId = data.map((x) => {
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
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllPaln();
  }

  ngOnInit(): void {
    this.getFactory();
    this.getAllPaln();
    this.createForm();
    this.getSku();
  }
}
