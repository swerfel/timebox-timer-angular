import { Component, Input } from '@angular/core';

import { Timebox } from './timebox';

@Component({
	selector: 'running-timebox',
	template: `
		<div *ngIf="timebox">
			<h2>{{timebox.amount}} {{timebox.unit}} selected</h2>
		</div>
	`
})

export class RunningTimeboxComponent {
	@Input() timebox: Timebox;
}