import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChanges(newValue: number) {
    // let elemHTML: any = document.getElementsByName('porcentaje')[0];
    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(valor) {

    if (this.porcentaje >= 95 && valor > 0) {
      this.porcentaje = 95;
      console.log(this.porcentaje + 'Sumando');
    }
    if (this.porcentaje <= 5 && valor < 0) {
      this.porcentaje = 5;
      console.log(this.porcentaje + 'Restando');
    }
// tslint:disable-next-line: radix
    this.porcentaje = this.porcentaje + parseInt(valor);
    console.log(this.porcentaje);
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

}
