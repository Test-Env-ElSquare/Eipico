import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { NewErrPageComponent } from './views/pages/NewErrPage/NewErrPage.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'MainDash', pathMatch: 'full' },
      { path: 'error', component: ErrorPageComponent },
      {
        path: 'MainDash',
        loadChildren: () =>
          import('./components/main-dash/main-dash.module').then(
            (m) => m.MainDashModule
          ),
      },
      {
        path: 'Historical',
        loadChildren: () =>
          import('./components/Historical/Historical.module').then(
            (m) => m.HistoricalModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./components/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'Scada',
        loadChildren: () =>
          import('./components/scada/scada.module').then((m) => m.ScadaModule),
      },
      {
        path: 'Material',
        loadChildren: () =>
          import('./components/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },

      // { path: 'state', loadChildren: () => import('./components/state/state.module').then(m => m.StateModule) },
      {
        path: 'Scale',
        loadChildren: () =>
          import('./components/scale/scale.module').then((m) => m.ScaleModule),
      },

      {
        path: 'batchScheduler',
        loadChildren: () =>
          import('./components/batch-scheduler/batch-scheduler.module').then(
            (m) => m.BatchSchedulerModule
          ),
      },
      {
        path: 'machines',
        loadChildren: () =>
          import('./components/machines/machines.module').then(
            (m) => m.MachinesModule
          ),
      },
      {
        path: 'planProduct',
        loadChildren: () =>
          import('./components/plan-product/plan-product.module').then(
            (m) => m.PlansModule
          ),
      },
      {
        path: 'planResource',
        loadChildren: () =>
          import('./components/plan-resource/plan-resource.module').then(
            (m) => m.PlanResourceModule
          ),
      },
      {
        path: 'warehouse',
        loadChildren: () =>
          import('./components/warehouse/warehouse.module').then(
            (m) => m.WarehouseModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./components/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'batchSetting',
        loadChildren: () =>
          import('./components/batch-setting/batch-setting.module').then(
            (m) => m.BatchSettingModule
          ),
      },
      {
        path: 'error/:type',
        component: ErrorPageComponent,
        data: {},
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./views/pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'Scale',
        loadChildren: () =>
          import('./components/scale/scale.module').then((m) => m.ScaleModule),
      },
      { path: '**', redirectTo: 'MainDashboard', pathMatch: 'full' },
    ],
  },

  // {
  //   path: 'error',
  //   component: ErrorPageComponent,
  //   data: {
  //     'type': 404,
  //     'title': 'Page Not Found',
  //     'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
  //   }
  // },
  // {
  //   path: 'error/:type',
  //   component: ErrorPageComponent
  // },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
