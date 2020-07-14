import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;
  nombreTxt: HTMLDocument;
  correo;
  password;
  password2;
  constructor(public usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null , Validators.required ),
      correo: new FormControl( null , [Validators.required, Validators.email] ),
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required )
    }, { validators: this.sonIguales( 'password', 'password2' )  } );


    // this.forma.setValue({
    //   nombre: 'Test ',
    //   correo: 'test@test.com',
    //   password: '123456',
    //   password2: '123456',
    //   condiciones: true
    // });
  }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    // if (!this.forma.value.condiciones) {
    //   swal.fire({
    //     title: 'Importante',
    //     text: 'Debe de aceptar las condiciones',
    //     icon: 'warning'});
    //   return;
    // }

    this.usuario = {
      nombre: this.forma.value.nombre,
      correo: this.forma.value.correo,
      password: this.forma.value.password
    };

    console.log(this.forma.value);
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(resp => {
        (document.getElementById('nombre') as HTMLInputElement).value = '';
        (document.getElementById('correo') as HTMLInputElement).value = '';
        (document.getElementById('password') as HTMLInputElement).value = '';
        (document.getElementById('password2') as HTMLInputElement).value = '';
      });
    //     (document.getElementById('nombre') as HTMLInputElement).value = '';
    //     this.forma.value.nombre = '';
    //     this.forma.value.correo = '';
    //     this.forma.value.password = '';
    //     this.forma.value.password2 = '';
    //   });
              // .subscribe( resp => this.router.navigate(['/login']));
  }

}
