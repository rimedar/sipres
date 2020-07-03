import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  roles: string[] = ['MISIONAL', 'GESTOR', 'ADMIN'];
  itemsPorPagina: number = 5;
  paginaActual: number = 1;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios( )
              .subscribe( (resp: any) => {
                this.usuarios = resp.usuarios;
                this.cargando = false;

              });

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this.usuarioService.buscarUsuarios( termino )
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });

  }

  borrarUsuario( usuario: Usuario ) {

    if (usuario._id === this.usuarioService.usuario._id) {
      console.log('Usuario cargado' + usuario._id);
      console.log('Usuario logueado' + this.usuarioService.usuario._id);

      swal.fire({ title: 'No puede borrar usuario', text: 'No se puede borrar a si mismo', icon: 'error' });
      return;
    }
    console.log('Usuario cargado' + usuario._id);
    console.log('Usuario logueado' + this.usuarioService.usuario._id);
    swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })
    .then( borrar => {

      if (borrar.value) {
        this.usuarioService.borrarUsuario( usuario._id )
                  .subscribe( borrado => {
                      this.cargarUsuarios();
                  });

      } else if (
        /* Read more about handling dismissals below */
        borrar.dismiss === swal.DismissReason.cancel
      ) {
        swal.fire(
          'Cancelado',
          'El usuario no se elimino',
          'info'
        );
      }

    });

  }

  guardarUsuario(usuario: Usuario) {

    swal.fire({
      title: '¿Esta seguro?',
      text: 'Va a actualizar el usuario ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'Cancelar'
    })
      .then(actualizar => {

        if (actualizar.value) {
          this.usuarioService.actualizarUsuario(usuario)
            .subscribe();
        } else if (
          /* Read more about handling dismissals below */
          actualizar.dismiss === swal.DismissReason.cancel
        ) {
          swal.fire(
            'Cancelado',
            'El usuario no se actualizo',
            'info'
          );
        }

      });
  }
}
