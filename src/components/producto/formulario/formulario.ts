import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioProducto {

  nuevoProducto: Producto = {
    id: 4,
    nombre: 'Peras',
    precio: 2.3,
    descuento: 15,
    fecha_vencimiento: new Date(2026, 6, 10),
  };

  constructor(private productoSer: ProductoService) {}

  agregarProducto(): void {

    if (!this.nuevoProducto.nombre.trim()) {
      return;
    }

    this.productoSer.crear(this.nuevoProducto);

    this.nuevoProducto = {
      id: 0,
      nombre: '',
      precio: 0,
      descuento: 0,
      fecha_vencimiento: new Date(2000, 0, 1),
    };
  }
}