import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GestorGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService) {
  }
  canActivate(){if (this.usuarioService.usuario.role === 'ADMIN' || this.usuarioService.usuario.role === 'GESTOR') {
    return true;
  } else {
    swal.fire(
      'Alerta',
      'No estas autorizado para entrar a esta sección',
      'warning'
    );
    this.usuarioService.logout();
  }
}
}
