import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
})
export class DescuentoPipe implements PipeTransform {
  transform(valor: number, porcentaje: number): number {
    return valor - (valor * porcentaje /100);
  }
}
