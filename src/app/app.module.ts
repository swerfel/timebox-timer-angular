import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';


import { AppComponent }  from './app.component';
import { DefaultTimeboxesComponent } from './default-timeboxes.component'
import { RunningTimeboxComponent } from './running-timebox.component';

import { AppRoutingModule }     from './app-routing.module';

import { TimeboxService } from './timebox.service';

@NgModule({
  imports:      [ 
	BrowserModule,
    FormsModule,
	AppRoutingModule
  ],
  declarations: [ 
	AppComponent,
	DefaultTimeboxesComponent,
	RunningTimeboxComponent
  ],
  providers: [
	TimeboxService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


