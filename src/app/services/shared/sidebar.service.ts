import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
      ]
    },
    {
      titulo: 'Gestión de prestamos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Expedientes', url: '/expedientes' },
        { titulo: 'Prestamos', url: '/prestamos' },
        { titulo: 'Historico de Prestamos', url: '/historial-prestamos' }
      ]
    }
  ];

}
