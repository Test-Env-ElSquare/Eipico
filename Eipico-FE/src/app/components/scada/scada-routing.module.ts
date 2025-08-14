import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScadaComponent } from './scada.component';
import { MainScadaComponent } from './components/main-scada/main-scada.component';

const routes: Routes = [

  { path: 'mainScada', component: MainScadaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScadaRoutingModule { }
