import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Timebox } from './timebox';
import { PointInTime } from './point-in-time';
import { Duration } from './duration';
import { TimeboxService } from './timebox.service';


const TIMEOUT_OFFSET_IN_SECONDS = 60;

@Component({
	selector: 'running-timebox',
	templateUrl: './running-timebox.component.html',
	styleUrls: ['./running-timebox.component.css']
})
export class RunningTimeboxComponent implements OnInit{
	timebox: Timebox;
	startTime: PointInTime;
	remainingDuration: Duration;
	remainingInPercentsValue: number;
	remainingInPercents: string;
	
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
		console.log('Starting timebox of '+newTimebox.getHumanReadableText());
		this.timebox = newTimebox;
		this.startTime = this.currentTime();
		this.refreshRemainingTime();
		setInterval(() => { this.refreshRemainingTime() }, 100)
	}
	
	refreshRemainingTime(): void {		
		this.remainingDuration = this.timebox.minus(this.startTime.durationUntilNow());
		this.remainingInPercentsValue = this.remainingDuration.percentOf(this.timebox);
		this.remainingInPercents = this.remainingInPercentsValue + '%';
	}
	
	currentTime(): PointInTime {
		return PointInTime.now();
	}
	
	goBack(): void {
		this.location.back();
	}
}