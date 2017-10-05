import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultTimeboxesComponent } from './default-timeboxes.component'
import { RunningTimeboxComponent } from './running-timebox.component';

const routes: Routes = [
	{ path: 'timebox/:durationInSeconds', component: RunningTimeboxComponent }
];
     
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}