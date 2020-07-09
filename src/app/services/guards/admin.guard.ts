import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService) {
  }
  canActivate(){
    if (this.usuarioService.usuario.role === 'ADMIN') {
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
