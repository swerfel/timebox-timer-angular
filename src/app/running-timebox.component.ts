import 'rxjs/add/operator/switchMap';

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Title }                    from '@angular/platform-browser';

import { Timebox }        from './timebox';
import { PointInTime }    from './point-in-time';
import { Duration }       from './duration';
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
	remainingColor: string;
	heightValue: number;
  intervalHandle: number;
	
	constructor(
		private timeboxService: TimeboxService,
		private route: ActivatedRoute,
		private location: Location,
    private titleService: Title 
	) {}
	
	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.timeboxService.getTimeboxBySeconds(+params.get('durationInSeconds')))
			.subscribe(timebox => this.startTimebox(timebox));
    this.resetTitle();
	}
  
  resetTitle(): void {
    this.titleService.setTitle('Timebox-Timer');
  }
  
  ngOnDestroy(): void {
    this.stopContinualRefresh();
    this.resetTitle();
  }
	
	startTimebox(newTimebox: Timebox): void {
		console.log('Starting timebox of '+newTimebox.getHumanReadableText());
		this.timebox = newTimebox;
		this.startTime = this.currentTime();
    
		this.startContinualRefresh();
		this.stopRefreshAfterDoubleTimebox();
	}
  
  startContinualRefresh(): void {
    this.refreshRemainingTime();
		this.intervalHandle = setInterval(() => { this.refreshRemainingTime() }, 100);
  }
  
  stopContinualRefresh():void {
    if (this.intervalHandle)
      clearInterval(this.intervalHandle);
  }
  
  stopRefreshAfterDoubleTimebox(): void {
    setTimeout(() => { this.stopContinualRefresh() }, this.timebox.doubled().asMiliseconds());
  }
	
	refreshRemainingTime(): void {		
		this.remainingDuration = this.timebox.minus(this.startTime.durationUntilNow());
		this.remainingInPercentsValue = Math.max(0, this.remainingDuration.percentOf(this.timebox));
		this.remainingInPercents = this.remainingInPercentsValue + '%';
		this.heightValue = Math.max(1, 2*Math.min(100, Math.pow(110 - this.remainingInPercentsValue,4) / 1000000))
		
		let redValue = this.toColor(120 - this.remainingInPercentsValue*3.5);
		let greenValue = this.toColor(this.remainingInPercentsValue * 8);
		let blueValue = 0;
		this.remainingColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
    
    if(this.remainingDuration.isNegative())
      this.resetTitle();
    else
      this.titleService.setTitle(this.remainingDuration.getHumanReadableText() + ' remaining');
	}
	
	toColor(percentValue: number) {
		return 255 * Math.max(0, Math.min(100, percentValue)) / 100;
	}
	
	currentTime(): PointInTime {
		return PointInTime.now();
	}
}
