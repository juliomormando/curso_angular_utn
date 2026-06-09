/*
  Antes solo leíamos el JSON. Ahora, para simular que "guardamos" de verdad y
  que los datos persistan aunque recargues la página,
  usaremos LocalStorage. Si no hay nada guardado en el navegador,
  traeremos los datos del JSON por primera vez.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';

import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private jsonUrl = 'assets/data/producto.json';
  private storageKey = 'mis_productos';

  // Centralizamos el estado de la app acá. Todos los componentes van a escuchar este Subject.
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al instanciarse el servicio, cargamos los datos inmediatamente
    this.inicializarDatos();
  }

  // 1. Al arrancar, decide si lee de LocalStorage o va a buscar el JSON por primera vez
  private inicializarDatos(): void {
    const datosLocales = localStorage.getItem(this.storageKey);

    if (datosLocales) {
      // Si hay datos en LocalStorage, los metemos directamente en nuestro flujo reactivo
      this.productosSubject.next(JSON.parse(datosLocales));
    } else {
      // Si está vacío, leemos el JSON, guardamos en LocalStorage y notificamos al Subject
      this.http.get<Producto[]>(this.jsonUrl).subscribe({
        next: (productos) => {
          localStorage.setItem(this.storageKey, JSON.stringify(productos));
          this.productosSubject.next(productos);
        },
        error: (err) => console.error('Error al cargar el archivo JSON', err)
      });
    }
  }

  // 2. Para el componente Listar: devuelve el flujo reactivo siempre actualizado
  listar(): Observable<Producto[]> {
    return this.productos$;
  }

  // 3. Para la ruta dinámica del Formulario (Edición): busca en el estado actual de la memoria
  obtenerProductoPorId(id: number): Observable<Producto | undefined> {
    const productos = this.productosSubject.value;
    const encontrado = productos.find(p => p.id === id);
    return of(encontrado);
  }

  // 4. Crear o Actualizar de forma unificada: impacta en LocalStorage Y actualiza la vista en tiempo real
  guardarProducto(producto: Producto): void {
    const productosActuales = this.productosSubject.value;
    let productosActualizados = [...productosActuales];

    const index = productosActualizados.findIndex(p => p.id === producto.id);

    if (index !== -1) {
      // Si existe, modificamos el producto existente (Edición)
      productosActualizados[index] = producto;
    } else {
      // Si no existe, es uno nuevo. Le asignamos un ID único si viene en 0
      const nuevoProducto = {
        ...producto,
        id: producto.id === 0 ? Date.now() : producto.id
      };
      productosActualizados.push(nuevoProducto);
    }

    // 🔥 LA MAGIA EXTRA: Guardamos en LocalStorage Y ADEMÁS avisamos al Subject.
    // Esto hace que cualquier componente de la pantalla se entere y se actualice solo al instante.
    localStorage.setItem(this.storageKey, JSON.stringify(productosActualizados));
    this.productosSubject.next(productosActualizados);
  }

  // 5. Eliminar (¡Ya que lo tenías hecho lo dejamos perfecto!)
  eliminar(id: number): void {
    const productosActuales = this.productosSubject.value;
    const productosFiltrados = productosActuales.filter(p => p.id !== id);

    // Guardamos en ambos lados
    localStorage.setItem(this.storageKey, JSON.stringify(productosFiltrados));
    this.productosSubject.next(productosFiltrados);
  }
}