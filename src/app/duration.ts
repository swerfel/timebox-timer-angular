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
		return Math.floor(Math.abs(this.miliseconds) / MILISECONDS_PER_SECOND) % SECONDS_PER_MINUTE;
	}
	
	getMinutes(): number {
		return Math.floor( Math.abs(this.miliseconds) / MILISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
	}
	getHours(): number {
		return Math.floor( Math.abs(this.miliseconds) / MILSECONDS_PER_HOUR) % HOURS_PER_DAY;
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
		let asString = Duration.concat(
								Duration.toTextual(hours, 'Hour'),
								Duration.toTextual(minutes, 'Minute'),
								Duration.toTextual(seconds, 'Second')
							);
		if (this.miliseconds < 0)
			return '-' + asString;
		return asString;
	}
	
	minus(other: Duration) {
		return Duration.ofMiliseconds(this.miliseconds - other.miliseconds);
	}
	
	minusSeconds(seconds: number): Duration {
		return this.minus(Duration.ofMiliseconds(seconds * MILISECONDS_PER_SECOND));
	}
	
	percentOf(other: Duration): number {
		return this.miliseconds / other.miliseconds * 100;
	}
	
	doubled(): Duration {
		return Duration.ofMiliseconds(this.miliseconds * 2);
	}
	
	private static toTextual(amount: number, unit: string): string {
		if (amount === 0)
			return '';
		if (amount === 1)
			return amount + ' ' + unit;
		return amount + ' ' + unit + 's'; // plural
	}
	
	private static concat(hours: string, minutes: string, seconds: string): string {
		if (hours)
			return hours + ' ' + minutes + ' ' +seconds;
		if (minutes)
			return minutes + ' ' +seconds;
		if (seconds)
			return seconds;
		return '0 Seconds'
	}
}