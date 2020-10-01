import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatColorPickerModule} from '../../projects/mat-color-picker/src/lib/mat-color-picker.module';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		MatColorPickerModule,
		MatTabsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

