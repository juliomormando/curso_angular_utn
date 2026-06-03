import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTANTE: Importamos las herramientas de formularios reactivos
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../producto';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioProducto implements OnInit {

  // Declaramos la variable del formulario
  formProducto!: FormGroup;

  // Inyectamos el FormBuilder en el constructor
  constructor(
    private fb: FormBuilder,
    private productoSer: ProductoService
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario y sus validaciones
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      descuento: [0, [Validators.min(0), Validators.max(100)]],
      fecha_vencimiento: ['', Validators.required]
    });
  }

  // Creamos un "getter" para acortar el código del HTML al validar
  get nombreControl() {
    return this.formProducto.get('nombre');
  }
  get precioControl(){
    return this.formProducto.get('precio');
  }
  get descuentoControl(){
    return this.formProducto.get('descuento');
  }
  get fecha_vencimientoControl(){
    return this.formProducto.get('fecha_vencimiento');
  }

  // Método que se ejecuta al enviar el formulario
  guardar(): void {
    if (this.formProducto.invalid) {
      // Si el formulario no es válido, marcamos todos los campos como "tocados"
      // para que aparezcan los errores en pantalla y no continúe
      this.formProducto.markAllAsTouched();
      return;
    }

    // Si está todo bien, le enviamos los datos limpios al servicio
    // formProducto.value ya tiene la forma del objeto Producto { nombre, precio, etc. }
    this.productoSer.crear(this.formProducto.value);

    // Opcional: Limpiamos el formulario para una nueva carga
    this.formProducto.reset({ descuento: 0 });
  }
}