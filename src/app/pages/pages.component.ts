import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/settings/setting.service';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private ajustes: SettingService) { }

  ngOnInit(): void {
    console.log('Cargado');
    // this.ajustes.cargarAjustes();
    init_plugins();
  }

}
