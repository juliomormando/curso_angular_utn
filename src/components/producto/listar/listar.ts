import { Component, OnInit, LOCALE_ID } from '@angular/core'; // <-- Asegurate de que esté acá
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto';

// 1. Importamos el paquete de datos regionales para Argentina
import localeEsAr from '@angular/common/locales/es-AR';

// 2. Registramos los datos del idioma
registerLocaleData(localeEsAr, 'es-AR');

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  providers: [
    // 3. Le decimos a Angular que use este idioma por defecto en todo el componente
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})

export class ListarProducto implements OnInit {
  columnas: string[] = ['nombre', 'precio', 'descuento', 'vencimiento'];
  productos: Producto[] = [];

  constructor(private productoSer: ProductoService){}


  ngOnInit() {
    this.productoSer.listar().subscribe({
      next: (data) => {
        console.log('Productos:', data);
        console.log('Es array:', Array.isArray(data));
        console.log('Cantidad:', data?.length);

        this.productos = data as Producto[];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
