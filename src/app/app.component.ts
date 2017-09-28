import { Component } from '@angular/core';

export class Timebox {
  id: number;
  amount: number;
  unit: string;
  seconds: number;
}

const MIN: string = 'Minute(s)';
const H: string = 'Hour(s)'
const TIMEBOXES: Timebox[] = [
	{ id: 1, amount: 1, unit: MIN, seconds: 1*60 },
	{ id: 1, amount: 2, unit: MIN, seconds: 2*60 },
	{ id: 1, amount: 3, unit: MIN, seconds: 3*60 },
	{ id: 1, amount: 5, unit: MIN, seconds: 5*60 },
	{ id: 1, amount: 10, unit: MIN, seconds: 10*60 },
	{ id: 1, amount: 15, unit: MIN, seconds: 15*60 },
	{ id: 1, amount: 20, unit: MIN, seconds: 20*60 },
	{ id: 1, amount: 30, unit: MIN, seconds: 30*60 },
	{ id: 1, amount: 1, unit: H, seconds: 1*60*60 }
];

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
	<div>
		<h2>Timeboxes</h2>
		<ul class="timeboxes">
		  <li *ngFor="let timebox of timeboxes" 
			[class.selected]="timebox === selectedTimebox"
			(click)="onSelect(timebox)">
			 <span class="badge">{{timebox.amount}}</span> {{timebox.unit}}
		  </li>
		</ul>
	</div>
	<div *ngIf="selectedTimebox">
		<h2>{{selectedTimebox.amount}} {{selectedTimebox.unit}} selected</h2>
	</div>
  `,styles: [`
	  .selected {
		background-color: #CFD8DC !important;
		color: white;
	  }
	  .timeboxes {
		margin: 0 0 2em 0;
		list-style-type: none;
		padding: 0;
		width: 15em;
	  }
	  .timeboxes li {
		cursor: pointer;
		position: relative;
		left: 0;
		background-color: #EEE;
		margin: .5em;
		padding: .3em 0;
		height: 1.6em;
		border-radius: 4px;
	  }
	  .timeboxes li.selected:hover {
		background-color: #BBD8DC !important;
		color: white;
	  }
	  .timeboxes li:hover {
		color: #607D8B;
		background-color: #DDD;
		left: .1em;
	  }
	  .timeboxes .text {
		position: relative;
		top: -3px;
	  }
	  .timeboxes .badge {
		display: inline-block;
		font-size: small;
		color: white;
		padding: 0.8em 0.7em 0 0.7em;
		background-color: #607D8B;
		line-height: 1em;
		position: relative;
		left: -1px;
		top: -4px;
		height: 1.8em;
		margin-right: .8em;
		border-radius: 4px 0 0 4px;
	  }
	`]
})
export class AppComponent  { 
  title = 'Timebox-Timer';
  timeboxes = TIMEBOXES;
  selectedTimebox: Timebox;
  
  onSelect(timebox: Timebox): void {
	this.selectedTimebox = timebox;
  }
}
