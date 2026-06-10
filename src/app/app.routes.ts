/*
Paso 4: El Ruteo Principal y Lazy Loading (app-routing.module.ts)
  Ahora le decimos a la aplicación completa que cuando alguien escriba /productos en la barra de navegación,
  vaya y busque el módulo de productos solo en ese instante (Lazy Loading).
*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  // 1. Cuando la URL esté vacía, carga el componente Home con las 2 tarjetas
  { path: '', component: Home },

  // ¡Acá está la magia del Lazy Loading!
  {
    path: 'productos',
    loadChildren: () => import('./components/producto/producto.module').then(m => m.ProductoModule)
  },

  {
    path: 'usuario',
    loadChildren: () => import('./components/usuario/usuario.module').then(m => m.UsuarioModule)
  },

  { path: '**', redirectTo: '' } // Comodín por si escriben cualquier cosa
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // forRoot solo se usa en el módulo raíz
  exports: [RouterModule]
})
export class AppRoutingModule { }