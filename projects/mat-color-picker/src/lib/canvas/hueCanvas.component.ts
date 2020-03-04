import {Component, DoCheck, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EOrientation} from '../mat-color-picker.types';
import {SliderCanvas} from './sliderCanvas.component';
import {brightness, hsv2rgb} from '../util';


@Component({
	selector: 'tb-hue-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class HueCanvasComponent extends SliderCanvas implements OnInit, DoCheck {
	public type = 'hue';

	ngDoCheck() {
		super.ngDoCheck();
		if ( !this.ready ) {
			return;
		}
		if ( this._oldValue && this._value ) {
			if ( !this._oldValue || this._value.h !== this._oldValue.h ) {
				this.onColorSet();
			}
		} else if ( !this._oldValue && this._value ) {
			this.onColorSet();
		}
		this._oldValue = this._value;
	}

	draw() {

		// Create gradient

		let hueGrd;
		if ( this.isVertical() ) {
			hueGrd = this.context.createLinearGradient(90, 0.000, 90, this.height);
		} else {
			hueGrd = this.context.createLinearGradient(0, 90, this.width, 90);
		}


			// Add colors
		hueGrd.addColorStop(0, 'rgba(255, 0, 0, 1.000)');
		hueGrd.addColorStop(1 / 6, 'rgba(255, 255, 0, 1.000)');
		hueGrd.addColorStop(2 / 6, 'rgba(0, 255, 0, 1.000)');
		hueGrd.addColorStop(3 / 6, 'rgba(0, 255, 255, 1.000)');
		hueGrd.addColorStop(4 / 6, 'rgba(0, 0, 255, 1.000)');
		hueGrd.addColorStop(5 / 6, 'rgba(255, 0, 255, 1.000)');
		hueGrd.addColorStop(1, 'rgba(255, 0, 0, 1.000)');

		// Fill with gradient
		this.context.fillStyle = hueGrd;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);
	}

	getColorByPoint(x, y) {
		let currentHSV = this.value;
		let h = 360 * this.getPercentage( x, y );
		let s = currentHSV.s;
		let v = currentHSV.v;
		let a = currentHSV.a;

		this._value = {
			h: h,
			s: s,
			v: v,
			a: a
		};

		this.valueChange.emit( this._value );
	}

	onColorSet() {

		let hue = this.value.h;
		let pos = this.getSliderDimension() * (hue / 360);

		this.setMarkerCenter( pos );
		this.setMarkerColor();
	}

	setMarkerColor() {
		super.setMarkerColor();
		this.marker.nativeElement.style.setProperty( '--color','hsl(' + this._value.h + ', 100%, 50% )' );

	}
}
