import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home { }