import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HistorialPrestamoService } from '../../services/historial-prestamo/historial-prestamo.service';
import { HistorialPrestamo } from 'src/app/models/historial-prestamo.interface';
@Component({
  selector: 'app-historial-prestamos',
  templateUrl: './historial-prestamos.component.html',
  styles: [
  ]
})
export class HistorialPrestamosComponent implements OnInit {

  itemsPorPagina: number = 5;
  paginaActual: number = 1;
  cargando: boolean = true;
  hPrestamo: HistorialPrestamo[];
  constructor(public historialPrestamoService: HistorialPrestamoService) { }

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.cargando = true;
    this.historialPrestamoService.cargarHistorialPrestamos()
      .subscribe(prestamos => {
        console.log(prestamos);
        this.hPrestamo = prestamos;
        this.cargando = false;
        console.log(this.hPrestamo);
      });
  }

  buscarHistoricoPrestamo(termino: string, event) {

    if (termino.length <= 0) {
      this.cargarPrestamos();
      return;
    }
    if ((
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 65 && event.keyCode <= 90))) {
      this.cargando = true;
      this.historialPrestamoService.buscarHistoricoPrestamos(termino)
        .subscribe((prestamos: HistorialPrestamo[]) => {
          this.hPrestamo = prestamos;
          this.cargando = false;
        });
    }
  }

}
