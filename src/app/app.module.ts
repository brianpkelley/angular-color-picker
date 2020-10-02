import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
//import {AngularColorPickerModule} from '../../projects/angular-color-picker/src/lib/angular-color-picker.module';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularColorPickerModule} from '../../projects/angular-color-picker/src/lib/angular-color-picker.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AngularColorPickerModule,
		MatTabsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

