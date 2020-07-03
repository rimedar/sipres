import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Expediente } from '../../models/expediente.interface';

@Injectable({
  providedIn: 'root',
})
export class ExpedienteService {
  expediente: Expediente;
  totalExpedientes: number = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}

  cargarExpedientes() {
    const url = URL_SERVICIOS + '/expediente';
    return this.http.get(url);
    // return this.http.get( url ).pipe(
    //           map( (resp: any) => resp.expedientes
    //           ));
  }

  obtenerExpediente(id: string) {
    const url = URL_SERVICIOS + '/expediente/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.expediente));
  }

  crearExpediente(expediente: Expediente) {
    console.log('Entro');
    let url = URL_SERVICIOS + '/expediente';
    url += '?token=' + this.usuarioService.token;
    console.log(expediente);
    console.log(url);
    return this.http.post(url, expediente).pipe(
      map((resp: any) => {
        console.log('Un nivel mas');
        swal.fire({
          title: 'Expediente creado',
          text: expediente.id_expediente,
          icon: 'success',
        });
        return resp.expediente;
      })
    );
  }

  buscarExpediente(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/expedientes/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.expedientes));
  }

  actualizarExpediente(expediente: Expediente) {
    let url = URL_SERVICIOS + '/expediente/' + expediente._id;
    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, expediente).pipe(
      map((resp: any) => {
        swal.fire({
          title: 'Expediente Actualiado',
          text: 'Expediente con ID ' + expediente.id_expediente + ' actualizado correctamente',
          icon: 'success',
        });
        return resp.expediente;
      })
    );
  }

  borrarExpediente(id: string) {
    let url = URL_SERVICIOS + '/expediente/' + id;
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
