import { ShiftService } from './../../services/shift.service';
import { Component, OnInit } from '@angular/core';
import { IShift } from '../../models/model';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
})
export class ShiftComponent implements OnInit {
  constructor(private ShiftService: ShiftService) {}
  ShiftList: IShift[];
  hourFormat?: string;
  fromDate: Date | null = null;
  toDate: Date | null = null;
  showDeleteDialog = false;

  ngOnInit(): void {
    this.onGetAllShifts();
  }
  onGetAllShifts() {
    this.ShiftService.getAllShifts().subscribe({
      next: (res) => {
        this.ShiftList[0] = res;
        console.log(this.ShiftList);
      },
    });
  }
  openDeleteDialog() {
    this.showDeleteDialog = true;
  }
}
