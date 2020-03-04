import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import * as TinyColor from 'tinycolor2';
import {EOrientation} from '../../projects/mat-color-picker/src/lib/mat-color-picker.types';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mat-color-picker-app';
	colors = [{h: 240, s: 1, v: 1, a: 1}];
	TinyColor = TinyColor;
	EOrientation = EOrientation;

	constructor( private sanitizer: DomSanitizer ) {

	}

	getStyle( style ) {
		console.log( "SET STYLE", style );
		return this.sanitizer.bypassSecurityTrustStyle( style.toRgb() );
	}

}
