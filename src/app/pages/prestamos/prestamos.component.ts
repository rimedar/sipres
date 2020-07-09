import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../models/prestamo.interface';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { Usuario } from '../../models/usuario.model';
import { HistorialPrestamo } from 'src/app/models/historial-prestamo.interface';
import { HistorialPrestamoService } from '../../services/historial-prestamo/historial-prestamo.service';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';

const moment = require('moment');
moment.locale('es');

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styles: [
  ]
})
export class PrestamosComponent implements OnInit {
  prestamosFiltro: number = 0;
  itemsPorPagina: number = 5;
  paginaActual: number = 1;
  cargando: boolean = true;
  hPrestamo: HistorialPrestamo;
  usuario: Usuario;
  prestamo: Prestamo;
  prestamos: Prestamo[] = [];
  constructor(public prestamoService: PrestamoService,
              public usuarioService: UsuarioService,
              public historialPrestamoService: HistorialPrestamoService) {
               }

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  ngOnCreate(): void{
  }

  cargarPrestamos() {
    console.log(this.usuarioService.usuario.role);
    this.cargando = true;
    this.prestamoService.cargarPrestamos()
      .subscribe(prestamos => {
        this.prestamos = prestamos;
        this.cargando = false;
        console.log(this.prestamos.length);
        this.filtrarPrestamo();
      });
  }

  filtrarPrestamo() {
    for (let counter: number = 0; counter < this.prestamos.length; counter++) {
      if (this.usuarioService.usuario._id === this.prestamos[counter].id_usuario[`_id`]) {
        this.prestamosFiltro = this.prestamosFiltro + 1;
        return this.prestamosFiltro;
      }
    }
  }

  buscarPrestamo(termino: string, event) {
    if (termino.length <= 0) {
      this.cargarPrestamos();
      return;
    }
    if ((
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 65 && event.keyCode <= 90))) {
      this.cargando = true;
      this.prestamoService.buscarPrestamos(termino)
        .subscribe((prestamos: Prestamo[]) => {
          this.prestamos = prestamos;
          this.cargando = false;
        });
    }
  }


  liberarPrestamo(prestamo: Prestamo) {
    const fechaEntrega = moment().format('L');
    swal.fire({
      title: 'Liberar Prestamo',
      text: 'Se liberara el expediente con ID ' + prestamo.id_exp[`id_expediente`],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!',
      cancelButtonText: 'Cancelar'
    })
      .then(liberar => {

        if (liberar.value) {
          console.log(prestamo.estado_prestamo + ' ' + fechaEntrega);
          console.log();

          this.hPrestamo = {
            id_expediente: prestamo.id_exp[`id_expediente`],
            nombre_usuario: prestamo.id_usuario[`nombre`],
            estado_prestamo: 'DEVUELTO',
            fecha_prestamo: prestamo.fecha_prestamo,
            fecha_devolucion: fechaEntrega,
            id_exp: prestamo.id_exp,
            id_usuario: prestamo.id_usuario
          };
          console.log(this.hPrestamo);
          this.historialPrestamoService.guardarHistorialPrestamo(this.hPrestamo)
            .subscribe();
          this.prestamoService.eliminarPrestamo(prestamo._id)
          .subscribe( () =>  this.cargarPrestamos() );
          // this.cargarPrestamos();
          /// console.log(this.prestamo);
          // this.prestamoService.eliminarPrestamo( prestamo._id )
          //         .subscribe( () =>  this.cargarPrestamos() );

        }
        else if (liberar.dismiss === swal.DismissReason.cancel) {
          swal.fire(
            'Cancelado',
            'El Expediente no se libero',
            'info'
          );
        }
      });
  }
}
