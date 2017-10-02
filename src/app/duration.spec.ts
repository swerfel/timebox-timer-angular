import { Duration } from './duration';


describe('Duration', () => {
	let timestampDuration = 1506951416498; // Mon, 02 Oct 2017 13:36:56 +0000
	let zeroHMSMS = 1/*day*/ * 24 * 60 * 60 * 1000; 
	let midleHMSMS = ((12*60+30)*60+30)*1000+500; // 12h,30min,30sec,500ms
	let maxHMSMS = ((23*60+59)*60+59)*1000+999; // 23h,59min,59sec,999ms


	it('return correct seconds', () => {
		let seconds = function(miliseconds: number) { return Duration.ofMiliseconds(miliseconds).getSeconds(); };
		expect(seconds(timestampDuration)).toBe(56); 
		expect(seconds(zeroHMSMS)).toBe(0); 
		expect(seconds(midleHMSMS)).toBe(30);  
		expect(seconds(maxHMSMS)).toBe(59); 
	});
	
	it('return correct minutes', () => {
		let minutes = function(miliseconds: number) { return Duration.ofMiliseconds(miliseconds).getMinutes(); };
		expect(minutes(timestampDuration)).toBe(36); 
		expect(minutes(zeroHMSMS)).toBe(0); 
		expect(minutes(midleHMSMS)).toBe(30); 
		expect(minutes(maxHMSMS)).toBe(59); 
	});
	
	it('return correct hours', () => { 
		let hours = function(miliseconds: number) { return Duration.ofMiliseconds(miliseconds).getHours(); };
		expect(hours(timestampDuration)).toBe(13); 
		expect(hours(zeroHMSMS)).toBe(0); 
		expect(hours(midleHMSMS)).toBe(12); 
		expect(hours(maxHMSMS)).toBe(23); 
	});
	
	it('computes correct difference', () => {
		let first = Duration.ofMiliseconds(42999);
		let second = Duration.ofMiliseconds(17000);
		expect(first.deltaToInSeconds(second)).toBe(25);
	});
	
	it('create a human readable string', () => {
		// TODO remove leading space!
		let text = function(miliseconds: number) { return Duration.ofMiliseconds(miliseconds).getHumanReadableText() };
		expect(text(timestampDuration)).toBe(' 13 Hours 36 Minutes 56 Seconds'); 
		expect(text(zeroHMSMS)).toBe(''); 
		expect(text(midleHMSMS)).toBe(' 12 Hours 30 Minutes 30 Seconds'); 
		expect(text(maxHMSMS)).toBe(' 23 Hours 59 Minutes 59 Seconds'); 
	});
});