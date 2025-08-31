import { Component, OnInit } from '@angular/core';
import { AddProductPlans } from './models/model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { Permission } from 'src/app/core/models/permission';

@Component({
  selector: 'app-plans',
  templateUrl: './plan-product.component.html',
  styleUrls: ['./plan-product.component.scss'],
})
export class PlansComponent implements OnInit {
  newObj: AddProductPlans;
  constructor(private perms: PermissionService) {}

  //take the emited value from child
  newPostDone(data: AddProductPlans) {
    return (this.newObj = data);
  }

  hasAccessToAddProductPlanning() {
    return this.perms.has(Permission.ProductionPlanAndAdd);
  }

  ngOnInit(): void {}
}
