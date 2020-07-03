import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.interface';
import { UsuarioService } from '../services/usuario/usuario.service';
// import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  email: string;
  recuerdame: boolean = false;

  auth2: any;


  constructor(private router: Router,
              public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    // this.googleInit();
    if (this.usuarioService.token) {

      this.router.navigate(['/']);
  }
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  // googleInit() {

  //   gapi.load('auth2', () => {

  //     this.auth2 = gapi.auth2.init({
  //       client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     });

  //     this.attachSignin( document.getElementById('btnGoogle') );

  //   });

  // }

  // attachSignin( element ) {

  //   this.auth2.attachClickHandler( element, {}, (googleUser) => {

  //     // let profile = googleUser.getBasicProfile();
  //     let token = googleUser.getAuthResponse().id_token;

  //     this.usuarioService.loginGoogle( token )
  //             .subscribe( () => window.location.href = '#/dashboard'  );

  //   });

  // }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    // const usuario = new Usuario(null, forma.value.email, forma.value.password );
    this.usuario = {
      nombre: null,
      correo: forma.value.email,
      password: forma.value.password
    };

    this.usuarioService.login(this.usuario, forma.value.recuerdame)
      .subscribe(rest => {
        this.router.navigate(['/dashboard']);
        console.log(rest);
      });

    // this.router.navigate([ '/dashboard' ]);

  }

}
