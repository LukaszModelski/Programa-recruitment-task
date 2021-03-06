import { Component } from '@angular/core';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDevMode: boolean = isDevMode();
  title = 'Tour of Heroes';
}
