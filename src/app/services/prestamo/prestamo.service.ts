import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Prestamo } from '../../models/prestamo.interface';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamo: Prestamo;
  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService) { }

    cargarPrestamos() {

      const url = URL_SERVICIOS + '/prestamo';

      return this.http.get( url ).pipe(
                map( (resp: any) => {
                  return resp.prestamos;
                }));

    }

    buscarPrestamos( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/coleccion/prestamos/' + termino;
      return this.http.get(url).pipe(
        map((resp: any) => resp.prestamos));

    }

    guardarPrestamo( prestamo: Prestamo ) {

      let url = URL_SERVICIOS + '/prestamo';

      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, prestamo).pipe(
        map((resp: any) => {
          swal.fire({
            title: 'Prestamo Creado',
            text: prestamo.fecha_prestamo,
            icon: 'success'
          });
          return resp.prestamo;
        }));
      }

  eliminarPrestamo(id: string) {
      let url = URL_SERVICIOS + '/prestamo/' + id;
      url += '?token=' + this.usuarioService.token;

      return this.http.delete(url).pipe(
        map((resp) =>
          swal.fire({
            title: 'Expediente Borrado',
            text: 'Expediente eliminado correctamente',
            icon: 'success',
          })
        )
      );
  }
}
