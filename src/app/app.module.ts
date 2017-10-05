import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TimeboxSelectorComponent } from './timebox-selector.component'
import { RunningTimeboxComponent } from './running-timebox.component';

import { AppRoutingModule }     from './app-routing.module';

import { TimeboxService } from './timebox.service';

@NgModule({
  imports:      [ 
	BrowserModule,
	AppRoutingModule
  ],
  declarations: [ 
	AppComponent,
	TimeboxSelectorComponent,
	RunningTimeboxComponent
  ],
  providers: [
	TimeboxService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


