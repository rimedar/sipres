import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ingresar() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    init_plugins();
  }

}
