export interface Producto {
  id:number;
  nombre:string;
  descripcion?: string;
  fecha_vencimiento:Date;
  precio:number;
  descuento:number;
}
