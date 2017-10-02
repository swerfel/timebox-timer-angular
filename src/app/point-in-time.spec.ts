import { PointInTime } from './point-in-time';


describe('get seconds', () => {
	var returnedDate = new Date();
	let earlier = new PointInTime(returnedDate.getTime() - 59*1000); // 59 seconds earlier
	
	beforeEach(() => {
		PointInTime.setTestTimeProvider({
			now(): Date {
				return returnedDate;
			}
		});
	}); 
	
	it('computes seconds until now', () => {
		expect(earlier.secondsUntilNow()).toBe(59);
	});
});