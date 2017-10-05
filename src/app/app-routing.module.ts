import {APP_BASE_HREF} from '@angular/common';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RunningTimeboxComponent } from './running-timebox.component';
import { environment } from './../environments/environment';

const routes: Routes = [
	{ path: 'timebox/:durationInSeconds', component: RunningTimeboxComponent }
];
     
@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
    providers: [{provide: APP_BASE_HREF, useValue : environment.basehref }]
})
export class AppRoutingModule {}
