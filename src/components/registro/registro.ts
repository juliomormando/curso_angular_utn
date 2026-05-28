import { Component, signal } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  protected readonly title = signal('Formulario');
  protected readonly descripcion = signal('Formulario de carga de datos.');

  formulario: FormGroup;
  constructor(private fb:FormBuilder){
    this.formulario= this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      mensaje:['']
    })
  }

  enviar(){
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
    else {
      console.log('Completar los datos del formulario')
    }
  }
}
