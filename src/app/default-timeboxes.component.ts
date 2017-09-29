import { Component, OnInit } from '@angular/core';

import { Timebox } from './timebox';

import { TimeboxService } from './timebox.service';


@Component({
  selector: 'default-timeboxes',
  templateUrl: './default-timeboxes.component.html',
  styleUrls: ['./default-timeboxes.component.css'],
  providers: [ TimeboxService ]
})
export class DefaultTimeboxesComponent implements OnInit { 
  timeboxes: Timebox[];
  selectedTimebox: Timebox;
  
  constructor(private timeboxService: TimeboxService) { }
  
  getDefaultTimeboxes(): void {
	this.timeboxService.getDefaultTimeboxes().then(timeboxes => this.timeboxes = timeboxes);
  }
  
  ngOnInit(): void {
	this.getDefaultTimeboxes();
  }
  
  onSelect(timebox: Timebox): void {
	this.selectedTimebox = timebox;
  }
}
