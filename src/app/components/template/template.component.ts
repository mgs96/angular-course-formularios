import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false;
  };

  paises = [{
    codigo: 'COL',
    nombre: 'Colombia'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  }];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('ngForm:', forma);
    console.log('valor:', forma.value);
    console.log('Usuario:', this.usuario);
  }

}
