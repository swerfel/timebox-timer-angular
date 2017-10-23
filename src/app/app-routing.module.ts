import {APP_BASE_HREF} from '@angular/common';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';

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
export class AppRoutingModule {
  constructor(private router: Router){
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
}
