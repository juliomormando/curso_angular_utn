import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ProductoService {
  private jsonUrl = 'assets/data/producto.json'

  constructor(private productoLista: HttpClient){};

  listar(){
    return this.productoLista.get<Producto[]>(this.jsonUrl);

  }

  crear(producto:Producto){
    const nuevo = {...producto, id:Date.now()};
    return this.productoLista.post(this.jsonUrl, nuevo);
  }

}
