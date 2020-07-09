import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];
  constructor(public usuarioService: UsuarioService) {
  }

  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Inicio', url: '/dashboard' },
  //     ]
  //   },
  //   {
  //     titulo: 'Gestión de prestamos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Expedientes', url: '/expedientes' },
  //       { titulo: 'Prestamos', url: '/prestamos' },
  //       { titulo: 'Historico de Prestamos', url: '/historial-prestamos' }
  //     ]
  //   }
  // ];

}
