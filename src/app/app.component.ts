import { Component, OnInit } from '@angular/core';

import { Timebox } from './timebox';

import { TimeboxService } from './timebox.service';


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
	<running-timebox [timebox]="selectedTimebox"></running-timebox>
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
	`],
	providers: [ TimeboxService ]
  })
export class AppComponent implements OnInit { 
  title = 'Timebox-Timer';
  timeboxes: Timebox[];
  selectedTimebox: Timebox;
  
  constructor(private timeboxService: TimeboxService) { }
  
  getDefaultTimeboxes(): void {
	this.timeboxes = this.timeboxService.getDefaultTimeboxes().then(timeboxes => this.timeboxes = timeboxes);
  }
  
  ngOnInit(): void {
	this.getDefaultTimeboxes();
  }
  
  onSelect(timebox: Timebox): void {
	this.selectedTimebox = timebox;
  }
}
