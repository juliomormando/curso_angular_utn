import { Component, OnInit, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto';


import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})


export class ListarProducto implements OnInit {
  columnas: string[] = ['nombre', 'precio', 'descuento', 'vencimiento', 'acciones'];
  productos: Producto[] = [];

  constructor(
    private productoSer: ProductoService,
    private cdr: ChangeDetectorRef
  ){}

  eliminarProducto(producto: Producto): void {
    this.productoSer.eliminar(producto.id);
  }

  ngOnInit(): void {
    this.productoSer.listar().subscribe(data => {
      this.productos = data;
      console.log('Datos recibidos en el componente:', data);

      this.cdr.detectChanges();
    });

    this.productoSer.cargarProductos();
  }
}
