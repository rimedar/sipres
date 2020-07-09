import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  nombre: string;
  constructor(public sidebar: SidebarService,
              public usuarioService: UsuarioService) {

    this.nombre = this.usuarioService.usuario.nombre;
  }

  ngOnInit(): void {
    this.sidebar.cargarMenu();
  }

}
