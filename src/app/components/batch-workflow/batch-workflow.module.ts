import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BatchWorkflowRoutingModule } from './batch-workflow-routing.module';
import { BatchWorkflowComponent } from './batch-workflow.component';

@NgModule({
  declarations: [BatchWorkflowComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BatchWorkflowRoutingModule,
  ],
})
export class BatchWorkflowModule {}
