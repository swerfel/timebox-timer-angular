import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Timebox } from './timebox';
import { TimeboxService } from './timebox.service';

@Component({
	selector: 'running-timebox',
	templateUrl: './running-timebox.component.html';
	styleUrls: ['./running-timebox.component.css']
})

export class RunningTimeboxComponent implements OnInit{
	@Input() timebox: Timebox;
	
	constructor(
		private timeboxService: TimeboxService,
		private route: ActivatedRoute,
		private location: Location
	) {}
	
	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => this.timeboxService.getTimeboxBySeconds(+params.get('durationInSeconds')))
			.subscribe(timebox => this.timebox = timebox);
	}
	
	goBack(): void {
		this.location.back();
	}
}