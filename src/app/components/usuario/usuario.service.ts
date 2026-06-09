/*
  Antes solo leíamos el JSON. Ahora, para simular que "guardamos" de verdad y
  que los datos persistan aunque recargues la página,
  usaremos LocalStorage. Si no hay nada guardado en el navegador,
  traeremos los datos del JSON por primera vez.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';

import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class usuarioervice {

  private jsonUrl = 'assets/data/usuario.json';
  private storageKey = 'mis_usuario';

  // Centralizamos el estado de la app acá. Todos los componentes van a escuchar este Subject.
  private usuarioSubject = new BehaviorSubject<Usuario[]>([]);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al instanciarse el servicio, cargamos los datos inmediatamente
    this.inicializarDatos();
  }

  // 1. Al arrancar, decide si lee de LocalStorage o va a buscar el JSON por primera vez
  private inicializarDatos(): void {
    const datosLocales = localStorage.getItem(this.storageKey);

    if (datosLocales) {
      // Si hay datos en LocalStorage, los metemos directamente en nuestro flujo reactivo
      this.usuarioSubject.next(JSON.parse(datosLocales));
    } else {
      // Si está vacío, leemos el JSON, guardamos en LocalStorage y notificamos al Subject
      this.http.get<Usuario[]>(this.jsonUrl).subscribe({
        next: (usuario) => {
          localStorage.setItem(this.storageKey, JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
        },
        error: (err) => console.error('Error al cargar el archivo JSON', err)
      });
    }
  }

  // 2. Para el componente Listar: devuelve el flujo reactivo siempre actualizado
  listar(): Observable<Usuario[]> {
    return this.usuario$;
  }

  // 3. Para la ruta dinámica del Formulario (Edición): busca en el estado actual de la memoria
  obtenerusuarioPorId(id: number): Observable<Usuario | undefined> {
    const usuario = this.usuarioSubject.value;
    const encontrado = usuario.find(p => p.id === id);
    return of(encontrado);
  }

  // 4. Crear o Actualizar de forma unificada: impacta en LocalStorage Y actualiza la vista en tiempo real
  guardarusuario(usuario: Usuario): void {
    const usuarioActuales = this.usuarioSubject.value;
    let usuarioActualizados = [...usuarioActuales];

    const index = usuarioActualizados.findIndex(p => p.id === usuario.id);

    if (index !== -1) {
      // Si existe, modificamos el usuario existente (Edición)
      usuarioActualizados[index] = usuario;
    } else {
      // Si no existe, es uno nuevo. Le asignamos un ID único si viene en 0
      const nuevousuario = {
        ...usuario,
        id: usuario.id === 0 ? Date.now() : usuario.id
      };
      usuarioActualizados.push(nuevousuario);
    }

    // 🔥 LA MAGIA EXTRA: Guardamos en LocalStorage Y ADEMÁS avisamos al Subject.
    // Esto hace que cualquier componente de la pantalla se entere y se actualice solo al instante.
    localStorage.setItem(this.storageKey, JSON.stringify(usuarioActualizados));
    this.usuarioSubject.next(usuarioActualizados);
  }

  // 5. Eliminar (¡Ya que lo tenías hecho lo dejamos perfecto!)
  eliminar(id: number): void {
    const usuarioActuales = this.usuarioSubject.value;
    const usuarioFiltrados = usuarioActuales.filter(p => p.id !== id);

    // Guardamos en ambos lados
    localStorage.setItem(this.storageKey, JSON.stringify(usuarioFiltrados));
    this.usuarioSubject.next(usuarioFiltrados);
  }
}