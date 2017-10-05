import { Component } from '@angular/core';

@Component({
  selector: 'timebox-timer-app',
  template: `
    <h1><img class="title-image" src="../icon.png"/>{{title}}</h1>
    <default-timeboxes></default-timeboxes>
	<router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Timebox-Timer';
}