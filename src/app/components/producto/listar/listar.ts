import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Clave para el @if y pipes comunes
import { RouterModule } from '@angular/router'; // <-- Clave para que funcione el [routerLink]
import { FormsModule } from '@angular/forms';

// Importaciones de Angular Material específicas para esta pantalla
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // <-- ¡ACÁ ESTÁ LA SOLUCIÓN!

import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto.service';
import { DescuentoPipe } from '../../../pipes/descuento-pipe';

@Component({
  selector: 'app-listar',
  standalone: true,
  templateUrl: './listar.html',
  styleUrl: './listar.css',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule, // <-- Se lo inyectamos directamente en la vena al componente
    DescuentoPipe
  ]
})


export class ListarProducto implements OnInit {
  columnas: string[] = ['nombre', 'precio', 'descuento', 'precioDescuento', 'vencimiento', 'acciones'];
  productos: Producto[] = [];

  constructor(
    private productoSer: ProductoService,
  ){}

  ngOnInit(): void {
    this.productoSer.listar().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Datos recibidos en el componente:', data);
      },
      error: (err) => console.error('Error al recibir productos en el componente', err)
    });
  }

  eliminarProducto(producto: Producto): void {
    if (confirm(`¿Estás seguro de eliminar ${producto.nombre}?`)) {
      this.productoSer.eliminar(producto.id);
    }
  }
}
