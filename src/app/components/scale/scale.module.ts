import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScaleRoutingModule } from './scale-routing.module';
import { ScaleComponent } from './scale.component';
import { ScaleStatusComponent } from './components/scale-status/scale-status.component';
import { RoomViewComponent } from './components/room-view/room-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ScaleComponent, ScaleStatusComponent, RoomViewComponent],
  imports: [
    CommonModule,
    ScaleRoutingModule,
    NgxPaginationModule,
    FeatherIconModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class ScaleModule {}
