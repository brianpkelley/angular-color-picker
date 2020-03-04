import {Component, DoCheck, HostBinding, Input, ViewEncapsulation} from '@angular/core';
import {GradientCanvas} from './gradientCanvas.component';
import {ICoord} from '../mat-color-picker.types';


@Component({
	selector: 'tb-wheel-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class WheelCanvasComponent extends GradientCanvas implements DoCheck {
	public type = 'wheel';

	//@Input() hueSteps: number = 360;
	//@Input() lightSteps: number = 0;
	@Input() adjustBlack = true;
	@HostBinding('class.round') round = true;

	private hueSteps = 360;
	private lightSteps = 1;

	ngDoCheck() {
		super.ngDoCheck();
		if ( !this.ready ) {
			return;
		}
		if ( this._oldValue && this._value ) {
			if (this._value.h !== this._oldValue.h || this._value.s !== this._oldValue.s || this._value.v !== this._oldValue.v) {
				this.onColorSet();
			}
			if ( this.adjustBlack && this._value.v !== this._oldValue.v ) {
				this.draw();
			}
		}
		this._oldValue = this._value;
	}


	draw() {
		let partLength = (2 * Math.PI) / this.hueSteps;
		let start = 0;
		let xc = this.width / 2;
		let yc = this.height / 2;
		let r = this.width / 2;

		let v = this.adjustBlack ? 1 - this.value.v  : 1;

		// Color Wheel
		for (let i = 0; i < 360; i += 360/this.hueSteps ) {
			this.context.beginPath();
			this.context.strokeStyle = 'hsl(' + i + ', 100%, 50%)';
			this.context.arc(xc, yc, r / 2, start, start + partLength + 0.01); // Add 0.01 for overlapping paths.
			this.context.lineWidth = r;
			this.context.stroke();
			this.context.closePath();

			start += partLength;
		}

		this.context.beginPath();
		let grd = this.context.createRadialGradient(xc, yc, 0, xc, yc, r);
		grd.addColorStop(0, "rgba(255,255,255,1)");
/*
		let stepVal = 1 / this.lightSteps;
		let last = 1;
		for ( let i = 1, pos = stepVal, a = 1 - stepVal; i < this.lightSteps; i++, pos += stepVal, a -= stepVal ) {
			grd.addColorStop(pos-0.001, "rgba(255,255,255," + last + ")" );
			grd.addColorStop(pos, "rgba(255,255,255," + a + ")" );
			last = a;
		}*/
		grd.addColorStop(1, "rgba(255,255,255,0)");

		this.context.arc(xc, yc, r, 0, 2 * Math.PI, false);
		this.context.fillStyle = grd;
		this.context.fill();

		this.context.arc( xc, yc, r, 0, 2 * Math.PI, false );
		this.context.fillStyle = 'rgba( 0, 0, 0, ' + v + ')';
		this.context.fill();


		this.context.beginPath();
		this.context.arc(xc, yc, r+0.5, 0, 2 * Math.PI, false);
		this.context.strokeStyle = "#fff";
		this.context.lineWidth = 1;
		this.context.stroke()

		// Update the marker color
		this.setMarkerColor();
	}

	getColorByPoint(x, y) {
		//let adjusted = this.adjustXY(x, y);

		let PI = Math.PI;
		let radius = ( this.height / 2 );

		let xCart = x - radius;
		let yCart = y - radius;


		let h = Math.atan2(yCart, xCart) * (180 / PI);
		let s = Math.round( Math.min(1, Math.sqrt(xCart * xCart + yCart * yCart) / radius) * 1000 ) / 1000;
		let v = this.value.v;
		let a = this.value.a;


		// atan2 works in -180..180 so we need to rectify the negatives
		h = (h > 0 ? h : 360 + h);

		/*if ( this.hueSteps !== 360 ) {
			h = Math.floor(h / (360 / this.hueSteps)) * (360 / this.hueSteps);
		}*/

		this._value = {h, s, v, a};
		//this._oldValue = {h, s, v, a};
		this.valueChange.emit(this._value);

	}

	/**
	 * adjustXY - Limit the mouse coordinates to with in the wheel.
	 */
	adjustXY(x:number, y:number): ICoord {
		let radius = this.height / 2;

		// Plot the values on a cartesian plane
		let xCart = x - radius;// * radius;
		let yCart = y - radius;// * radius;

		let theta = Math.atan2(yCart, xCart);

		// Get the radius of the cartesian plot
		let radiusCart = Math.min(this.height / 2, Math.sqrt(xCart * xCart + yCart * yCart));

		// Get the new x,y plot inside the circle using the adjust radius from above
		xCart = radiusCart * Math.cos(theta);
		yCart = radiusCart * Math.sin(theta);


		// Calculate the angle of the cartesian plot
		if (radiusCart >= radius ) {
			// Get the new x,y plot inside the circle using the adjust radius from above
			xCart = radius * Math.cos(theta);
			yCart = radius * Math.sin(theta);
		}



		// Center in Canvas
		let xAdjusted = xCart + radius;
		let yAdjusted = yCart + radius;

		return {x: xAdjusted, y: yAdjusted};
	}

	onColorSet() {
		super.onColorSet();

		let hsv = this.value;
		let hue = hsv.h;
		let PI = Math.PI;
		let radius = (this.height / 2) * hsv.s;

		// Calculate the angle of the cartesian plot
		let theta = hue * (PI / 180);

	/*	if ( this.hueSteps !== 360 ) {
			let hueStep = 360 / this.hueSteps;
			theta = (theta > 0 ? theta : 360 + theta);
			theta = hueStep / 2 + (Math.floor(theta / hueStep) * hueStep);
			theta = theta / (180 / Math.PI);
			//console.log("Adjust x,y for Wheel", x, y, theta, r);
		}*/


		// Get the new x,y plot inside the circle using the adjust radius from above
		let xCoord = radius * Math.cos(theta);
		let yCoord = radius * Math.sin(theta);

		xCoord = xCoord + this.width / 2;
		yCoord = yCoord + this.height / 2;

		//this.adjustXY

		this.setMarkerCenter(xCoord, yCoord);
		this.setMarkerColor();
	}

	//setMarkerColor( ) {
	//	this.marker.nativeElement.style.borderColor = TinyColor.mostReadable( this.value, ["#fff", "#000"] );
	//}

}
