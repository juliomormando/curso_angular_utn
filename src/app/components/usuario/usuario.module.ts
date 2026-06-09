/*
Este archivo agrupa todo lo que tenga que ver con "Productos" para que se pueda cargar en un solo bloque encapsulado cuando el usuario entre a esta sección.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Asegurate de que sea Reactive y no el común
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Angular Material Imports que usa tu tabla
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioRoutingModule } from './usuario.routing.module';
// import { ListarProducto } from './listar/listar';
import { FormularioUsuario } from './formulario/usuario';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    UsuarioRoutingModule,
    FormularioUsuario
  ]
})
export class UsuarioModule { }