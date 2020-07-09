import { Injectable } from '@angular/core';
import { HistorialPrestamo } from './../../models/historial-prestamo.interface';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HistorialPrestamoService {

  prestamo: HistorialPrestamo;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarHistorialPrestamos() {

    const url = URL_SERVICIOS + '/historial-prestamo';

    return this.http.get( url ).pipe(
              map( (resp: any) => {
                return resp.prestamos;
              }));

  }

  guardarHistorialPrestamo( prestamo: HistorialPrestamo) {

    let url = URL_SERVICIOS + '/historial-prestamo';

    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, prestamo).pipe(
      map((resp: any) => {
        swal.fire({
          title: 'Historial Creado',
          text: prestamo.fecha_prestamo,
          icon: 'success'
        });
        return resp.prestamo;
      }));
  }

  buscarHistoricoPrestamos( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/historico-prestamos/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.prestamos));

  }

}
