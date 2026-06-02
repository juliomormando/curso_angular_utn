import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private jsonUrl = 'assets/data/producto.json';

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {}


  cargarProductos(): void {
    this.http.get<Producto[]>(this.jsonUrl).subscribe(data => {
      this.productosSubject.next(data);
    });
  }

  listar(): Observable<Producto[]> {
    return this.productos$;
  }

  crear(producto: Producto): void {
    const productosActuales = this.productosSubject.value;

    const nuevo: Producto = {
      ...producto,
      id: Date.now()
    };

    this.productosSubject.next([
      ...productosActuales,
      nuevo
    ]);
  }

  eliminar(id: number): void {
    const productosActuales = this.productosSubject.value;

    this.productosSubject.next(
      productosActuales.filter(p => p.id !== id)
    );
  }
}