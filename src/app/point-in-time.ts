import { TimeProvider } from './time-provider';
import { Duration } from './duration';

export class PointInTime{
	private static provider: TimeProvider = new TimeProvider();
	private sinceEpoch: Duration;
	
	constructor(miliseconds: number) {
		this.sinceEpoch = Duration.ofMiliseconds(miliseconds);
    }
	
	static setTestTimeProvider(provider: TimeProvider) {
		PointInTime.provider = provider;
	}
	
	static fromDate(date: Date) {
		return new PointInTime(date.getTime());
	}
	
	static now(): PointInTime {
		return PointInTime.fromDate(PointInTime.provider.now());
	}

	secondsUntilNow(): number {
		return PointInTime.now().sinceEpoch.deltaToInSeconds(this.sinceEpoch);
	}
	
	durationUntilNow(): Duration {
		return PointInTime.now().sinceEpoch.minus(this.sinceEpoch);
	}
}