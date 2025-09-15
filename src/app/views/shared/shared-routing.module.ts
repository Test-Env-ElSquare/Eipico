import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponentComponent } from './components/delete-component/delete-component.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';

const routes: Routes = [
  { path: 'delete-dialog', component: DeleteComponentComponent },
  { path: 'edit-dialog', component: EditComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
