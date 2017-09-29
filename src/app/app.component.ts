import { Component } from '@angular/core';

@Component({
  selector: 'timebox-timer-app',
  template: `
    <h1>{{title}}</h1>
	<nav>
		<a routerLink="/timeboxes" routerLinkActive="active">Timeboxes</a>
	</nav>
    
	<router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Timebox-Timer';
}