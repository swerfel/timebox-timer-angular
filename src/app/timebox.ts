const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MAX_DURATION_IN_SECONDS = SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;

export class Timebox {
	humanReadableText: string;
	seconds: number;
	
	constructor(humanReadable: string, seconds: number) {
        this.humanReadableText = humanReadable;
		this.seconds = seconds;
    }
	
	public static fromSeconds(rawSeconds: number): Timebox {
		var totalSeconds = Timebox.trimValidating(rawSeconds);
		var text = Timebox.toHumanReadableString(totalSeconds);
		
		return new Timebox(text, totalSeconds);
	}
	
	private static toHumanReadableString(totalSeconds: number): string {
		var seconds = totalSeconds % SECONDS_PER_MINUTE;
		var remaining = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
		console.log('sec: ' +seconds+' remaining: '+remaining);
		
		var minutes = remaining % MINUTES_PER_HOUR;
		remaining = Math.floor(remaining / MINUTES_PER_HOUR);
		console.log('min: ' +minutes+' remaining: '+remaining);
		
		var hours = remaining % HOURS_PER_DAY;
		remaining = Math.floor(remaining / HOURS_PER_DAY);
		console.log('h: ' +hours+' remaining: '+remaining);
		
		// assert seconds, minutes or hours > 0 => non empty string
		return Timebox.toTextual(hours, 'Hour')+Timebox.toTextual(minutes, 'Minute')+ Timebox.toTextual(seconds, 'Second');
	}
	
	private static trimValidating(rawSeconds: number): number {
		var totalSeconds = Math.floor(rawSeconds);
		
		if (totalSeconds >= MAX_DURATION_IN_SECONDS) {
			console.warn('Timebox was trimmed to under 24 hours from ' + totalSeconds + ' seconds');
			totalSeconds = MAX_DURATION_IN_SECONDS;
		} else if (totalSeconds <= 0) {
			console.warn('Set timebox to minimal value of 1 second instead of '+totalSeconds);
			totalSeconds = 1;
		}
		return totalSeconds;
	}
	
	private static toTextual(amount: number, unit: string): string {
		if (amount === 0)
			return '';
		if (amount === 1)
			return ' ' + amount + ' ' + unit;
		return ' ' + amount + ' ' + unit + 's'; // plural
	}
}