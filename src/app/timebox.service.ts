import { Injectable } from '@angular/core';

import { Timebox } from './timebox';
import { TIMEBOXES } from './default-timeboxes';

@Injectable()
export class TimeboxService {
	getDefaultTimeboxes(): Promise<Timebox[]> {
		return Promise.resolve(TIMEBOXES);
	}
}