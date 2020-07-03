import { Component, OnInit } from '@angular/core';
import { Prestamo } from '../../models/prestamo.interface';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { Usuario } from '../../models/usuario.model';
import { HistorialPrestamo } from 'src/app/models/historial-prestamo.interface';
import { HistorialPrestamoService } from '../../services/historial-prestamo/historial-prestamo.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styles: [
  ]
})
export class PrestamosComponent implements OnInit {
  itemsPorPagina: number = 5;
  paginaActual: number = 1;
  cargando: boolean = true;
  usuario: Usuario;
  prestamo: Prestamo;
  prestamos: Prestamo[] = [];
  constructor(public prestamoService: PrestamoService,
              public historialPrestamoService: HistorialPrestamoService) { }

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.cargando = true;
    this.prestamoService.cargarPrestamos()
      .subscribe(prestamos => {
        console.log(prestamos);
        this.prestamos = prestamos;
        this.cargando = false;
        console.log(this.prestamos);
      });
  }

  buscarPrestamo( termino: string, event ) {

    if ( termino.length <= 0 ) {
      this.cargarPrestamos();
      return;
    }
    if ((
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 65 && event.keyCode <= 90))) {
      this.cargando = true;
      this.prestamoService.buscarPrestamos( termino )
        .subscribe((prestamos: Prestamo[]) => {
          this.prestamos = prestamos;
          this.cargando = false;
        });
    }
  }


  liberarPrestamo( prestamo: Prestamo ) {

    this.prestamoService.eliminarPrestamo( prestamo._id )
            .subscribe( () =>  this.cargarPrestamos() );

  }

}
