import { Component, signal } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,
      CommonModule,
      RouterModule,
      FormsModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule, // <-- Se lo inyectamos directamente en la vena al componente
    ],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class FormularioUsuario {
  protected readonly title = signal('Nuevo');
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
      this.formulario.reset();
    }
    else {
      console.log('Completar los datos del formulario')
    }
  }
}
