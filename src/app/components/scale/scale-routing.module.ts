import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaleStatusComponent } from './components/scale-status/scale-status.component';
import { RoomViewComponent } from './components/room-view/room-view.component';

const routes: Routes = [
  { path: 'status', component: ScaleStatusComponent },
  { path: 'roomDetails/:id/:factoryId', component: RoomViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScaleRoutingModule {}
