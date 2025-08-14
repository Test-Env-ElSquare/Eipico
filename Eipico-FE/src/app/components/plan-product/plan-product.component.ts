import { Component, OnInit } from '@angular/core';
import { AddProductPlans } from './models/model';
import { AuthService } from 'src/app/core/services/Auth.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plan-product.component.html',
  styleUrls: ['./plan-product.component.scss'],
})
export class PlansComponent implements OnInit {
  newObj: AddProductPlans;
  constructor(private _authService: AuthService) {}

  //take the emited value from child
  newPostDone(data: AddProductPlans) {
    return (this.newObj = data);
  }

  hasAccessToAddProductPlanning() {
    return this._authService.isHasAccessToProductionPlanAndAdd();
  }

  ngOnInit(): void {}
}
