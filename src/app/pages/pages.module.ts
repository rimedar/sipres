import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common'; // Para poder usar NgIf y otros
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { HistorialPrestamosComponent } from './historial-prestamos/historial-prestamos.component'; // Para la paginacion de datos

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    UsuariosComponent,
    ExpedientesComponent,
    PrestamosComponent,
    HistorialPrestamosComponent
  ],
  exports: [
    DashboardComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule
   ],
})
export class PagesModule { }
