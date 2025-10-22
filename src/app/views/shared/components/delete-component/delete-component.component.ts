import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  confirm1() {
    // Cancel button
    this.cancel.emit();
  }

  confirm2() {
    // Delete button

    console.log('✅ confirm2 clicked');
    this.confirm.emit();
  }
  ngOnInit(): void {}
}
