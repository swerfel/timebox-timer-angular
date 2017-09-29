import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Timebox } from './timebox';
import { TimeboxService } from './timebox.service';


const TIMEOUT_OFFSET_IN_SECONDS = 60;

@Component({
	selector: 'running-timebox',
	templateUrl: './running-timebox.component.html',
	styleUrls: ['./running-timebox.component.css']
})
export class RunningTimeboxComponent implements OnInit{
	timebox: Timebox;
	startTime: Date;
	remainingTime: string;
	remainingSeconds: number;
	percentsRemaining: string;
	
	constructor(
		private timeboxService: TimeboxService,
		private route: ActivatedRoute,
		private location: Location
	) {}
	
	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.timeboxService.getTimeboxBySeconds(+params.get('durationInSeconds')))
			.subscribe(timebox => this.startTimebox(timebox));
	}
	
	startTimebox(newTimebox: Timebox): void {
		console.log('Starting timebox of '+newTimebox.humanReadableText);
		this.timebox = newTimebox;
		this.startTime = this.currentTime();
		this.refreshRemainingTime();
		setInterval(() => { this.refreshRemainingTime() }, 1000)
	}
	
	refreshRemainingTime(): void {
		var passedSeconds = Math.round((this.currentTime()-this.startTime)/1000);
		
		this.remainingSeconds = this.timebox.seconds - passedSeconds;
		this.remainingTime = 'Remaining ' + this.remainingSeconds + " seconds";
		this.percentsRemaining = Math.round(this.remainingSeconds / this.timebox.seconds * 100)+'%';
	}
	
	currentTime(): Date {
		return new Date();
	}
	
	goBack(): void {
		this.location.back();
	}
}