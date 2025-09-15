import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { SharedRoutingModule } from './shared-routing.module';
import { DeleteComponentComponent } from './components/delete-component/delete-component.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [DeleteComponentComponent, EditComponentComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    SharedRoutingModule,
    ButtonModule,
  ],
  exports: [DeleteComponentComponent, EditComponentComponent],
  providers: [MessageService, ConfirmationService],
})
export class SharedModule {}
