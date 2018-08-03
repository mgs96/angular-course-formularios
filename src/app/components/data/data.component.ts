import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { resolve } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;
  usuario: any = {
    nombreCompleto: {
      nombre: 'Mauricio',
      apellido: 'Guzman'
    },
    correo: 'mauricio@guzman.com',
    pasatiempos: ['correr', 'dormir', 'bailar']
  };

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ]),
        'apellido': new FormControl('', [
                                          Validators.required,
                                          this.noGuzman
                                        ]),
      }),
      'correo': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                      ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    // this.forma.setValue(this.usuario);
   }

   guardarCambios() {
     console.log(this.usuario);
     console.log(this.forma.value);
     console.log(this.forma);
    //  this.forma.reset({
    //    nombreCompleto: {
    //      nombre: '',
    //      apellido: ''
    //    },
    //    correo: ''
    //  });
   }

   agregarPasatiempos() {
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     );
   }

   noGuzman(controls: FormControl): { [s: string]: boolean } {
     if (controls.value === 'guzman') {
       return {
         noguzman: true
      };
    }
     return null;
   }

   noIgual(controls: FormControl): { [s: string]: boolean } {
     const forma: any = this;
     if (controls.value !== forma.controls['password1'].value) {
       return {
         noiguales : true
        };
      }
     return null;
   }

   existeUsuario(controls: FormControl): Promise<any> | Observable<any> {
     // tslint:disable-next-line:no-shadowed-variable
     const promesa = new Promise((resolve, reject) => {
       setTimeout(() => {
         if (controls.value === 'mgs96') {
           resolve({ existe: true });
         } else {
           resolve(null);
         }
       }, 3000);
     });
     return promesa;
   }
 }
