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
import { AdminGuard } from '../services/guards/admin.guard';
import { GestorGuard } from '../services/guards/gestor.guard';
import { RegisterComponent } from './register/register.component';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Inicio'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Cambiar tema'} },

      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Usuarios' }
      },

      { path: 'expedientes', component: ExpedientesComponent, data: { titulo: 'Expedientes' } },

      {
        path: 'prestamos',
        component: PrestamosComponent,
        data: { titulo: 'Prestamos' }
      },
      {
        path: 'historial-prestamos',
        component: HistorialPrestamosComponent,
        canActivate: [GestorGuard],
        data: { titulo: 'Historial Prestamos' }
      },
      {
        path: 'registro',
        component: RegisterComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Registro de Usuarios' }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
