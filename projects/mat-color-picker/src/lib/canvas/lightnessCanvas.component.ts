/**
 * While the ComponentSliderCanvasComponent supports this same functionality,
 */

import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import { hsv2hsl } from '../util';
import {SliderCanvas} from './sliderCanvas.component';
import {IColorHSV} from '../mat-color-picker.types';

@Component({
	selector: 'tb-lightness-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class LightnessCanvasComponent extends SliderCanvas implements DoCheck {
	public type = 'lightness';

	constructor() {
		//super();

		console.warn( "DEPRECATED: tb-lightness-canvas has been deprecated" );
	}

	ngDoCheck() {
		super.ngDoCheck();
		if ( !this.ready ) {
			return;
		}
		if ( this._oldValue ) {
			if (this._value.h !== this._oldValue.h || this._value.s !== this._oldValue.s || this._value.v !== this._oldValue.v ) {
				this.draw();
			}
			if (this._value.v !== this._oldValue.v) {
				this.onColorSet();
			}
		}
		this._oldValue = this._value;
	}

	draw() {
		this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

		// Create gradient
		var hueGrd;
		if ( this.isVertical() ) {
			hueGrd = this.context.createLinearGradient(90, 0, 90, this.height);
		} else {
			hueGrd = this.context.createLinearGradient(0, 90, this.width, 90);
		}
		let hsl = hsv2hsl( { h: this.value.h, s: this.value.s, v: 1 } );
		// Add colors

		hueGrd.addColorStop(0,	'hsla(' + this.value.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '%, 1)');
		hueGrd.addColorStop(1,	'rgba(0,0,0,1)');

		// Fill with gradient
		this.context.fillStyle = hueGrd;
		this.context.fillRect( 0, 0, this.canvas.nativeElement.width, this.height );

		this.canvas.nativeElement.classList.add('checkered');
		this.setMarkerColor();
	}

	getColorByPoint( x, y ) {
		var v = 1 - this.getPercentage( x, y );

		this._value = Object.assign( { ...this.value }, {v} ) as IColorHSV;

		this.valueChange.emit( this._value );
		this.setMarkerColor();
	}

	onColorSet( ) {
		//console.log('alpha onColorSet', this.$scope.data.color);
		//this.draw();
		let dim = this.getSliderDimension();
		let pos = dim - ( dim * this.value.v );

		this.setMarkerCenter( pos );
	}
}
