
import { Timebox } from './timebox';

const MIN: string = 'Minute(s)';
const H: string = 'Hour(s)'

export const TIMEBOXES: Timebox[] = [
	{ id: 1, amount: 1, unit: MIN, seconds: 1*60 },
	{ id: 1, amount: 2, unit: MIN, seconds: 2*60 },
	{ id: 1, amount: 3, unit: MIN, seconds: 3*60 },
	{ id: 1, amount: 5, unit: MIN, seconds: 5*60 },
	{ id: 1, amount: 10, unit: MIN, seconds: 10*60 },
	{ id: 1, amount: 15, unit: MIN, seconds: 15*60 },
	{ id: 1, amount: 20, unit: MIN, seconds: 20*60 },
	{ id: 1, amount: 30, unit: MIN, seconds: 30*60 },
	{ id: 1, amount: 1, unit: H, seconds: 1*60*60 }
];