const MILISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MILISECONDS_PER_MINUTE = MILISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MINUTES_PER_HOUR = 60;
const MILSECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const HOURS_PER_DAY = 24;

export class Duration {
	private miliseconds: number;
	
	constructor(miliseconds: number) {
		this.miliseconds = miliseconds;
    }
	
	static ofMiliseconds(miliseconds: number): Duration {
		return new Duration(miliseconds);
	}
	
	getSeconds(): number {
		return this.asSeconds() % SECONDS_PER_MINUTE;
	}
	
	getMinutes(): number {
		return Math.floor( this.miliseconds / MILISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
	}
	getHours(): number {
		return Math.floor( this.miliseconds / MILSECONDS_PER_HOUR) % HOURS_PER_DAY;
	}
	
	asSeconds(): number {
		return Duration.msToSec(this.miliseconds);
	}
	
	asMiliseconds(): number {
		return this.miliseconds;
	}
	
	deltaToInMiliseconds(other: Duration): number {
		return this.miliseconds - other.miliseconds;
	}
	
	deltaToInSeconds(other: Duration): number {
		return Duration.msToSec(this.deltaToInMiliseconds(other));
	}
	
	private static msToSec(miliseconds: number): number {
		return Math.floor(miliseconds / MILISECONDS_PER_SECOND);
	}
	
	getHumanReadableText(): string {
		var seconds = this.getSeconds();
		var minutes = this.getMinutes();
		var hours = this.getHours();
		
		// assert seconds, minutes or hours > 0 => non empty string
		return Duration.toTextual(hours, 'Hour')+Duration.toTextual(minutes, 'Minute')+ Duration.toTextual(seconds, 'Second');
	}
	
	minusSeconds(seconds: number): Duration {
		return Duration.ofMiliseconds(this.miliseconds - seconds * MILISECONDS_PER_SECOND);
	}
	
	percentOf(other: Duration): number {
		return this.miliseconds / other.miliseconds * 100;
	}
	
	private static toTextual(amount: number, unit: string): string {
		if (amount === 0)
			return '';
		if (amount === 1)
			return ' ' + amount + ' ' + unit;
		return ' ' + amount + ' ' + unit + 's'; // plural
	}
}