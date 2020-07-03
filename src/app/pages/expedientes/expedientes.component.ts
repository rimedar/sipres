import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../models/expediente.interface';
import { ExpedienteService } from '../../services/expediente/expediente.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styles: [
  ]
})
export class ExpedientesComponent implements OnInit {

  itemsPorPagina: number = 5;
  paginaActual: number = 1;
  cargando: boolean = true;
  expediente: Expediente;
  expedientes: Expediente[] = [];
  constructor(
    public expedienteService: ExpedienteService,
  ) { }

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  buscarExpediente( termino: string, event: any) {
    console.log(event.keyCode);
    // tslint:disable-next-line: max-line-length
    if ( termino.length <= 0 ) {
      this.cargarExpedientes();
      return;
    }
    if ((
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 65 && event.keyCode <= 90))) {
      this.cargando = true;
      this.expedienteService.buscarExpediente( termino )
        .subscribe((expedientes: Expediente[]) => {
          this.expedientes = expedientes;
          this.cargando = false;
        });
    }

  }

  cargarExpedientes() {
    this.cargando = true;
    this.expedienteService.cargarExpedientes()
      .subscribe((resp: any) => {
        this.cargando = false;
        this.expedientes = resp.expedientes;
        this.paginaActual = 1;
      });
  }


  guardarExpediente( expediente: Expediente) {
    swal.fire({
      title: '¿Esta seguro?',
      text: 'Va a actualizar el expediente ' + expediente.id_expediente,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!',
      cancelButtonText: 'Cancelar'
    })
      .then(actualizar => {
        if (actualizar.value) {
           this.expedienteService.actualizarExpediente( expediente )
            .subscribe();
          } else if (
            /* Read more about handling dismissals below */
            actualizar.dismiss === swal.DismissReason.cancel
          ) {
            swal.fire(
              'Cancelado',
              'El expediente no se actualizo',
              'info'
            );
          }
        });
    }

  borrarExpediente(expediente: Expediente) {
    swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el expediente' + expediente.id_expediente,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    })
      .then(borrar => {

        if (borrar.value) {
          this.expedienteService.borrarExpediente(expediente._id)
            .subscribe(() => this.cargarExpedientes());
        } else if (
          borrar.dismiss === swal.DismissReason.cancel
        ) {
          swal.fire(
            'Cancelado',
            'El Expediente no se elimino',
            'info'
          );
        }
      });
  }

  async crearExpediente() {
    let inputID;
    let inputCC;
    let inputNSol;
    let inputNpred;
    let inputTomos;
    const { value: formValues } = await swal.fire({
      title: 'Crear Expediente',
      text: 'Va a crear un nuevo expediente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear!',
      cancelButtonText: 'Cancelar',
      html:
        '<input id="idExp" class="swal2-input" placeholder="ID del expediente">' +
        '<input id="ccSol" class="swal2-input" placeholder="Cedula del solicitante">' +
        '<input id="nombreSol" class="swal2-input" placeholder="Nombre del solicitante">' +
        '<input id="nombrePred" class="swal2-input" placeholder="Nombre del predio">' +
        '<input id="tomos" class="swal2-input" placeholder="Numero de tomos">' +
        '<input id="prestado" value="Disponible" class="swal2-input" placeholder="Estado de prestamo" readonly>',

      focusConfirm: false,
      preConfirm: () => {
        return [
          inputID = (document.getElementById('idExp') as HTMLInputElement).value,
          inputCC = (document.getElementById('ccSol') as HTMLInputElement).value,
          inputNSol = (document.getElementById('nombreSol') as HTMLInputElement).value,
          inputNpred = (document.getElementById('nombrePred') as HTMLInputElement).value,
          inputTomos = (document.getElementById('tomos') as HTMLInputElement).value,
        ];
      }
    });
    if (formValues) {

      // swal.fire(JSON.stringify(formValues));
      this.expediente = {
        id_expediente: formValues[0],
        cc_solocitante: formValues[1],
        nombre_predio: formValues[2],
        nombre_solicitante: formValues[3],
        // tslint:disable-next-line: radix
        tomos: parseInt(formValues[4])
      };
      console.log('Antes de entrar' + this.expediente);

      this.expedienteService.crearExpediente(this.expediente)
        .subscribe(resp => this.cargarExpedientes());
      // console.log(formValues[0] + formValues[1]);
    }
    else if (swal.DismissReason.cancel) {
      swal.fire(
        'Cancelado',
        'El Expediente no se creo',
        'info'
      );
      console.log('Cancelado');
    }
  }

  // async crearExpediente() {

  //   const idExp = '';

  //   const { value: ipAddress } = await swal.fire({
  //     title: 'Crear Expediente',
  //     text: 'Ingrese el ID del Expediente',
  //     input: 'text',
  //     icon: 'info',
  //     showCancelButton: true,
  //     inputValidator: (value) => {
  //       if (!value || value.length === 0) {
  //         return 'Debes poner un ID Valido';
  //       }
  //     }
  //   });
  //   if (ipAddress) {
  //     swal.fire(`Your IP address is ${ipAddress}`);
  //   }
  // }

  // crearHospital() {

  //   swal({
  //     title: 'Crear hospital',
  //     text: 'Ingrese el nombre del hospital',
  //     content: 'input',
  //     icon: 'info',
  //     buttons: true,
  //     dangerMode: true
  //   }).then( (valor: string ) => {

  //     if ( !valor || valor.length === 0 ) {
  //       return;
  //     }

  //     this._hospitalService.crearHospital( valor )
  //             .subscribe( () => this.cargarHospitales() );

  //   });

  // }

  // actualizarImagen( hospital: Hospital ) {

  //   this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  // }
}
