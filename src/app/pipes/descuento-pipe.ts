import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
  // ❌ ELIMINÁ: standalone: true
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, descuento: number): number {
    if (!descuento || descuento <= 0) return precio;
    return precio - (precio * (descuento / 100));
  }
}
