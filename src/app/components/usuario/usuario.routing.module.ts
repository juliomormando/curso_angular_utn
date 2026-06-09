/*
Acá configuramos las rutas internas de los productos. Vamos a definir una ruta dinámica (:id) para cuando queramos editar o ver el detalle de un producto específico en el formulario.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormularioUsuario } from './formulario/usuario';

const routes: Routes = [
  { path: 'nuevo', component: FormularioUsuario },          // Ruta: /productos/nuevo
  { path: 'editar/:id', component: FormularioUsuario }      // Ruta dinámica: /productos/editar/5
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Se usa forChild para módulos secundarios
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }