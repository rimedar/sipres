import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.interface';
import { URL_SERVICIOS } from '../../config/config';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any [] = [];
  id: string;
  role: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log('Servicio listo');
    this.cargarStorage();
  }

  // No Funcional
  // estaLogueado() {
  //   return ( this.token.length > 5 ) ? true : false;
  // }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.correo);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      })
    );
  }

  cargarUsuarios() {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.get(url);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    url += '?token=' + this.token;

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal.fire({
          title: 'Usuario creado',
          text: usuario.correo,
          icon: 'success',
        });
        return resp.usuario;
      })
    );
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        swal.fire({
          title: 'Usuario Actualizado',
          text: usuario.nombre,
          icon: 'success',
        });
        return true;
      })
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map((resp) => {
        swal.fire({
          title: 'Usuario Borrado',
          text: 'El usuario se ha eliminado correctamente',
          icon: 'success',
        });
        return true;
      })
    );
  }

  asignarRole() {
    if (this.usuario.role === 'ADMIN') {
      this.role = 'Administrador';
    }
    else if (this.usuario.role === 'GESTOR') {
      this.role = 'Gestor documental';
    } else {
      this.role = 'Misional';
    }
    return this.role;
  }
}
