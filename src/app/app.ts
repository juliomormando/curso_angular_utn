import { Component, LOCALE_ID, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

/* import { Registro } from './components/registro/registro'; */

import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsAr, 'es-AR'); // Registramos 'es-AR' en Angular

@Component({
  selector: 'app-root',
  imports: [
    /* Registro, */
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
})

export class App {
  protected readonly title = signal(' Mormando Julio');
  protected readonly motivo = signal('Me anote en el curso de Angular, para seguir capacitandome en nuevas tecnologias. Es un desafio grande para mi, dado que hace tiempo que no hago desarrollo de software.');
}
