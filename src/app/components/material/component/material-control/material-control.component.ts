import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../service/material.service';
import { AllMaterials, Materials } from '../../modal/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/Auth.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { Permission } from 'src/app/core/models/permission';

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
  selectedItems: any[] = [];

  constructor(
    private _materialService: MaterialService,
    private _modalService: NgbModal,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _perms: PermissionService
  ) {}

  ngOnInit(): void {
    this.editedForm = this._fb.group({
      id: [0],
      name: [, Validators.required],
      itemCode: [, Validators.required],
    });

    this.GetAllMaterials();
  }
  onSearchChange(event: any) {
    // Debounce logic here if needed
  }

  toggleSelection(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1); // Deselect
    } else {
      this.selectedItems.push(item); // Select
    }
  }
  onSelectAll(event: any) {
    const filteredItems = this.AllMaterials.filter(
      (item) =>
        !this.searchText ||
        (item.itemCode?.toLowerCase().includes(this.searchText.toLowerCase()) ??
          false) ||
        (item.name?.toLowerCase().includes(this.searchText.toLowerCase()) ??
          false)
    ).slice((this.page - 1) * this.tableSize, this.page * this.tableSize);

    if (event.target.checked) {
      // Add all visible filtered items to selection (avoid duplicates)
      filteredItems.forEach((item) => {
        if (!this.selectedItems.includes(item)) {
          this.selectedItems.push(item);
        }
      });
    } else {
      // Remove all visible filtered items from selection
      this.selectedItems = this.selectedItems.filter(
        (item) => !filteredItems.includes(item)
      );
    }
  }

  deleteSelected() {
    if (this.selectedItems.length === 0) return;

    // Show confirmation if needed
    if (
      confirm(
        `Are you sure you want to delete ${this.selectedItems.length} items?`
      )
    ) {
      this.selectedItems.forEach((item) => {
        this.delete(item.id); // Reuse your existing delete method
      });
      this.selectedItems = []; // Clear selection after delete
    }
  }

  isItemSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }
  HasAccessToAddMaterial(): boolean {
    return this._perms.has(Permission.MaterialControl);
  }

  HasAccessToEditMaterial(): boolean {
    return this._perms.has(Permission.MaterialControl);
  }

  HasAccessToDeleteMaterial(): boolean {
    return this._perms.has(Permission.MaterialControl);
  }

  GetAllMaterials() {
    this._materialService
      .GetAllMaterials(this.tableSize, this.page)
      .subscribe((data) => {
        this.AllMaterials = data[0].matarials;
        this.count = data[0].count;
      });
  }

  delete(item: number) {
    this._materialService.DeleteMaterials([item]).subscribe((data: any) => {
      this._toastr.error('Deleted');
      this.GetAllMaterials();
    });
  }
  deleteMultiple(items: number[]) {
    this._materialService.DeleteMaterials(items).subscribe((data: any) => {
      this._toastr.error('Deleted multiple');
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
