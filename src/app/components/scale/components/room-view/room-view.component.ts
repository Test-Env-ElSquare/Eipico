import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScaleService } from '../../services/scale.service';
import { Rooms, ScaleReads, ScalereadData } from '../../model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
  id: number;
  factoryId: number;
  scaleRoom: Rooms[];
  scaleReads: ScalereadData[];
  scaleName: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;

  constructor(
    private _route: ActivatedRoute,
    private _scaleService: ScaleService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.factoryId = this._route.snapshot.params['factoryId'];
    this.GetRoomScales();
    this.getGetScaleReads(this.page);
  }

  GetRoomScales() {
    this._scaleService
      .GetRoomsScales(this.id, this.factoryId)
      .subscribe((data) => {
        console.log(data);
        this.scaleRoom = data;
      });
  }

  getGetScaleReads(page: number = 1) {
    this.page = page;
    this._scaleService
      .GetScaleReads(this.scaleName, this.tableSize, page)
      .subscribe((data) => {
        console.log(data);
        this.scaleReads = data[0].scaleread;
        this.count = data[0].count;
      });
  }

  openXl(content: any, scaleName: string) {
    this.scaleName = scaleName;
    this._modalService.open(content, { size: 'xl' });
    this.getGetScaleReads();
  }

  //pagenation
  onTableDataChange(event: any): void {
    this.page = event;
    this.getGetScaleReads(this.page);
  }
}
