import { Component, OnInit } from '@angular/core';

import { Timebox } from './timebox';

import { TimeboxService } from './timebox.service';


@Component({
  selector: 'timebox-selector',
  templateUrl: './timebox-selector.component.html',
  styleUrls: ['./timebox-selector.component.css'],
  providers: [ TimeboxService ]
})
export class TimeboxSelectorComponent implements OnInit { 
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
