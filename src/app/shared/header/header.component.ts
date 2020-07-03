import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  nombre: string;
  correo: string;
  constructor(public usuarioService: UsuarioService) {
    this.nombre = this.usuarioService.usuario.nombre;
    this.correo = this.usuarioService.usuario.correo;
   }

  ngOnInit(): void {
  }

}
