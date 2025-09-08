import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.scss'],
})
export class DeleteComponentComponent implements OnInit {
  showDeleteDialog = false;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  confirm1() {
    this.showDeleteDialog = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Rejected',
      detail: 'You have cancelled the action',
      life: 3000,
    });
  }

  confirm2() {
    this.showDeleteDialog = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'Item deleted successfully',
      life: 3000,
    });
  }
  ngOnInit(): void {}
}
