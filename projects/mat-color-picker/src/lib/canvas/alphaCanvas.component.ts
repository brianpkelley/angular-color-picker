import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import {SliderCanvas} from './sliderCanvas.component';
import {brightness, hsv2rgb} from '../util';


@Component({
	selector: 'tb-alpha-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class AlphaCanvasComponent extends SliderCanvas implements DoCheck {
	public type = 'alpha';


	ngDoCheck() {
		super.ngDoCheck();
		if ( !this.ready ) {
			return;
		}
		if ( this._oldValue && this._value ) {
			if (this._value.h !== this._oldValue.h || this._value.s !== this._oldValue.s || this._value.v !== this._oldValue.v) {
				this.draw();
			}
			if (this._value.a !== this._oldValue.a) {
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
		var colorRGB = hsv2rgb( this._value );

		// Add colors
		hueGrd.addColorStop(0,	'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 1.000)');
		hueGrd.addColorStop(1,	'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 0.000)');

		// Fill with gradient
		this.context.fillStyle = hueGrd;
		this.context.fillRect( 0, 0, this.canvas.nativeElement.width, this.height );

		this.canvas.nativeElement.classList.add('checkered');
		this.setMarkerColor();
	}

	getColorByPoint( x, y ) {
		var a = 1 - this.getPercentage( x, y ); // this.height - y ) / this.height;

		this._value.a = a;

		this.valueChange.emit( this._value );
		this.setMarkerColor();
	}

	onColorSet( ) {
		//this.draw();
		let dim = this.getSliderDimension();
		let pos = dim - ( dim * this._value.a );

		this.setMarkerCenter( pos, pos );
	}

	setMarkerColor( ) {
		this.marker.nativeElement.style.borderColor = brightness( this._value ) > 135 || (this._value.a !== undefined && this._value.a < .5) ? '#000' : '#fff';
		let rgb = hsv2rgb( this._value );

		this.marker.nativeElement.style.setProperty( '--color','rgba('+rgb.r+','+rgb.g+','+rgb.b+','+ (this._value.a === undefined ? '1' : this._value.a) +')' );

	}

}
