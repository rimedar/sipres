import { Injectable, Inject } from '@angular/core';
import { Ajustes } from '../../interfaces/setting.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    // this.colocarCheck();

    // mark = this.document.getElementByClassName()
    // this.document.classList.add('working');
    // this.document.getElementsByClassName('selector').setAttribute(`selector ${tema}-theme`, `selector ${tema}-theme working` );
    this.guardarAjustes();
  }

    // Funciones con js


  // aplicarCheck(link: any) {
  //   console.log(link);
  //   const selectores: any = document.getElementsByClassName('selector');
  //   for (const ref of selectores) {
  //     ref.classList.remove('working');
  //   }
  //   link.classList.add('working');
  // }

  // colocarCheck() {
  //   const tema = this.ajustes.tema;
  //   const selectores: any = document.getElementsByClassName('selector');
  //   for (const ref of selectores) {
  //     if (ref.getAttribute('data-theme') === tema) {
  //       ref.classList.add('working');
  //       break;
  //     }
  //   }
  // }

}
