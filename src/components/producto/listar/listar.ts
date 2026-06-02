import { Component, OnInit, LOCALE_ID } from '@angular/core'; // <-- Asegurate de que esté acá
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto';

// 1. Importamos el paquete de datos regionales para Argentina
import localeEsAr from '@angular/common/locales/es-AR';

// 2. Registramos los datos del idioma
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
    // 3. Le decimos a Angular que use este idioma por defecto en todo el componente
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})


export class ListarProducto implements OnInit {
  columnas: string[] = ['nombre', 'precio', 'descuento', 'vencimiento',  'acciones'];
  productos: Producto[] = [];

  constructor(private productoSer: ProductoService){}

  eliminarProducto(producto: Producto): void {
    this.productoSer.eliminar(producto.id);
  }

  ngOnInit(): void {
    this.productoSer.cargarProductos();

    this.productoSer.listar().subscribe(data => {
      this.productos = data;
    });
  }
}
