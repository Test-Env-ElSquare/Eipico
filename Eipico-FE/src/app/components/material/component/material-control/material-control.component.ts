import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../service/material.service';
import { AllMaterials, Materials } from '../../modal/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-material-control',
  templateUrl: './material-control.component.html',
  styleUrls: ['./material-control.component.scss'],
})
export class MaterialControlComponent implements OnInit {
  searchText: any = '';
  AllMaterials: Materials[];
  editedForm!: FormGroup;
  AddMaterialForm!: FormGroup;
  page: number = 1;
  count: number = 0;
  tableSize: number = 12;
  updatedModalTitle: string;

  constructor(
    private _materialService: MaterialService,
    private _modalService: NgbModal,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editedForm = this._fb.group({
      id: [0],
      name: [, Validators.required],
      itemCode: [, Validators.required],
    });

    this.GetAllMaterials();
  }

  HasAccessToAddMaterial(): boolean {
    return this._authService.isHasAccessToAddMaterial();
  }

  HasAccessToEditMaterial(): boolean {
    return this._authService.isHasAccessToEditMaterial();
  }

  HasAccessToDeleteMaterial(): boolean {
    return this._authService.isHasAccessToDeleteMaterial();
  }

  GetAllMaterials() {
    this._materialService
      .GetAllMaterials(this.tableSize, this.page)
      .subscribe((data) => {
        this.AllMaterials = data[0].matarials;
        this.count = data[0].count;
      });
  }

  delete(item: any) {
    this._materialService.DeleteMaterial(item).subscribe((data: any) => {
      this._toastr.error('deleted');
      this.GetAllMaterials();
    });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    if (this.AllMaterials !== undefined) {
      this.GetAllMaterials();
    }
  }

  // to  open modal and edit

  openLg(content: any, item: Materials) {
    this._modalService.open(content, { size: 'lg' });
    this.editedForm.patchValue({
      id: item.id,
      name: item.name,
      itemCode: item.itemCode,
    });
    this.updatedModalTitle = this.editedForm.get('name')?.value;
  }

  // after u apdate u can click save to save the update

  onUpdate(item: any) {
    this._materialService.UpdateMaterial(item).subscribe((data) => {
      this._toastr.info('updated');
      this.GetAllMaterials();
    });
  }

  // this modal is to add new material form

  openAddForm(content: any) {
    this.creatPostForm();
    this._modalService.open(content, { size: 'lg' });
  }

  // click to add the material u added

  add() {
    this._materialService
      .InsertMaterial(this.AddMaterialForm.value)
      .subscribe((data) => {
        {
          this._toastr.success('Added');
          this.GetAllMaterials();
        }
      });
  }

  //the form u added

  creatPostForm() {
    this.AddMaterialForm = this._fb.group({
      id: [0],
      name: [, Validators.required],
      itemCode: [, Validators.required],
    });
  }
}
