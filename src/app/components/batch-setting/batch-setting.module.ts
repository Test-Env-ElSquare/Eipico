import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchSettingRoutingModule } from './batch-setting-routing.module';
import { AllComponent } from './components/all/all.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { BatchHistoryComponent } from './components/batch-history/batch-history.component';
import { BatchWeightComponent } from './components/batch-weight/batch-weight.component';
import { SharedModule } from 'src/app/views/shared/shared.module';

@NgModule({
  declarations: [
    AllComponent,
    SearchPipe,
    BatchHistoryComponent,
    BatchWeightComponent,
  ],
  imports: [
    CommonModule,
    BatchSettingRoutingModule,
    NgxPaginationModule,
    FeatherIconModule,
    FormsModule,
    SharedModule,
  ],
})
export class BatchSettingModule {}
