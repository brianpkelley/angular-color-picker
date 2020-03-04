import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import {GradientCanvas} from './gradientCanvas.component';

@Component({
	selector: 'tb-spectrum-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class SpectrumCanvasComponent extends GradientCanvas implements DoCheck {
	public type = 'spectrum';

	ngDoCheck() {
		super.ngDoCheck();
		if (!this.ready) {
			return;
		}
		if (this._oldValue) {
			if (this._value.h !== this._oldValue.h) {
				this.draw();
				this.setMarkerColor();
			}
			if (this._value.s !== this._oldValue.s || this._value.v !== this._oldValue.v) {
				this.onColorSet();
			}
		}
		this._oldValue = this._value;
	}


	draw() {
		this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);


		// White gradient
		let whiteGrd = this.context.createLinearGradient(0, 0, this.canvas.nativeElement.width, 0);


		whiteGrd.addColorStop(0, 'rgba(255, 255, 255, 1.000)');
		whiteGrd.addColorStop(1, 'hsl( ' + this.value.h + ', 100%, 50%)');

		// Black Gradient
		let blackGrd = this.context.createLinearGradient(0, 0, 0, this.canvas.nativeElement.height);


		blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
		blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

		// Fill with solid
		//this.context.fillStyle = 'hsl( ' + this.value.h + ', 100%, 50%)';
		//this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

		// Fill with white
		this.context.fillStyle = whiteGrd;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

		// Fill with black
		// Odd bug prevented selecting min, max ranges from all gradients
		this.context.fillStyle = blackGrd;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

		// Update the marker color
		this.setMarkerColor();
	}

	getColorByPoint(x, y) {
		let hsv = this.value;
		let h = hsv.h;
		let s = x / this.height;
		let v = (this.height - y) / this.height;
		let a = hsv.a;

		this._value = {h, s, v, a};

		this.valueChange.emit(this._value);
		this.setMarkerColor();
	}


	onColorSet() {
		super.onColorSet();

		let hsv = this.value;

		let posX = this.canvas.nativeElement.width * hsv.s;
		let posY = this.canvas.nativeElement.height - (this.canvas.nativeElement.height * hsv.v);
		//
		this.setMarkerCenter(posX, posY);
		this.setMarkerColor();

	}
}
