import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal(' Mormando Julio');
  protected readonly motivo = signal('Me anote en el curso de Angular, para seguir capacitandome en nuevas tecnologias. Es un desafio grande para mi, dado que hace tiempo que no hago desarrollo de software.');
}