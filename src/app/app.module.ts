import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatColorPickerModule} from '../../projects/mat-color-picker/src/lib/mat-color-picker.module';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		MatColorPickerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
