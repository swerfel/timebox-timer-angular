import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimeboxSelectorComponent } from './timebox-selector.component'
import { RunningTimeboxComponent } from './running-timebox.component';
import { AppRoutingModule }     from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  imports:      [
		AppRoutingModule
      ],
      declarations: [
        AppComponent,
		TimeboxSelectorComponent,
		RunningTimeboxComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Timebox-Timer');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Timebox-Timer');
  }));
});
