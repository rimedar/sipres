import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { HistorialPrestamosComponent } from './historial-prestamos/historial-prestamos.component';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboar'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Cambiar tema'} },
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}},
      { path: 'expedientes', component: ExpedientesComponent, data: {titulo: 'Expedientes'}},
      { path: 'prestamos', component: PrestamosComponent, data: {titulo: 'Prestamos'}},
      { path: 'historial-prestamos', component: HistorialPrestamosComponent, data: {titulo: 'Historial Prestamos'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
