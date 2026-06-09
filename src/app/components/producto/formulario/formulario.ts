import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- Importamos las herramientas limpias
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Clave para el @if y pipes comunes
import { RouterModule } from '@angular/router'; // <-- Clave para que funcione el [routerLink]
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // <-- ¡ACÁ ESTÁ LA SOLUCIÓN!
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule, // <-- Se lo inyectamos directamente en la vena al componente
    MatFormFieldModule, // <-- Le da soporte a <mat-form-field> y <mat-error>
    MatInputModule,     // <-- Le da soporte a matInput
    MatButtonModule     // <-- Le da soporte a mat-raised-button
  ]
})
export class FormularioProducto implements OnInit {
  esEdicion: boolean = false;
  productoId: number = 0; // Guardamos el ID por separado para cuando sea edición
  formProducto!: FormGroup;

  // Inyectamos FormBuilder (fb) correctamente en el constructor junto con los demás servicios
  constructor(
    private fb: FormBuilder,
    private productoSer: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 1. Inicializamos la estructura del formulario y sus validaciones
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      descuento: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      fecha_vencimiento: ['', Validators.required]
    });

    // 2. Capturamos el parámetro dinámico de la URL
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.esEdicion = true;
      this.productoId = Number(idParam);

      // Buscamos el producto en nuestro almacenamiento persistente
      this.productoSer.obtenerProductoPorId(this.productoId).subscribe({
        next: (prod) => {
          if (prod) {
            // 🔥 LA MAGIA RECOMANADA: Rellenamos los campos del formulario reactivo con los datos del producto
            this.formProducto.patchValue(prod);
          }
        },
        error: (err) => console.error('Error al recuperar el producto para edición', err)
      });
    }
  }

  // Getters para simplificar la visualización de errores en el HTML
  get nombreControl() { return this.formProducto.get('nombre'); }
  get precioControl() { return this.formProducto.get('precio'); }
  get descuentoControl() { return this.formProducto.get('descuento'); }
  get fecha_vencimientoControl() { return this.formProducto.get('fecha_vencimiento'); }

  // Método que se ejecuta al enviar el formulario (ngSubmit)
  guardar(): void {
    if (this.formProducto.invalid) {
      // Si el usuario se olvidó de rellenar algo, obligamos a Angular a mostrar los errores visuales
      this.formProducto.markAllAsTouched();
      return;
    }

    // 🔥 Unificamos los datos: Tomamos lo que se escribió en el formulario reactivo
    const productoAGuardar: Producto = {
      id: this.esEdicion ? this.productoId : 0, // Si es edición mantiene su ID, si es nuevo va en 0 para que el servicio genere uno único
      ...this.formProducto.value // Extrae automáticamente: nombre, precio, descuento, fecha_vencimiento
    };

    // Guardamos de forma persistente e instantánea
    this.productoSer.guardarProducto(productoAGuardar);

    alert(this.esEdicion ? 'Producto actualizado con éxito' : 'Producto creado con éxito');

    // Redirigimos automáticamente al listado reactivo
    this.router.navigate(['/productos']);
  }
}