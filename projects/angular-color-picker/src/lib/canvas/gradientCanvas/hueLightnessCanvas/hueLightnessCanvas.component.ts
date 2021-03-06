import {Component, DoCheck, OnInit, ViewEncapsulation} from '@angular/core';
import {GradientCanvas} from '../gradientCanvas.component';
import {TBColorHelpers} from '../../../services/colorHelpers';


@Component({
	selector: 'tb-hue-lightness-canvas',
	templateUrl: '../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class HueLightnessCanvasComponent extends GradientCanvas implements OnInit, DoCheck {
	public type = 'hue';

	ngDoCheck() {
		super.ngDoCheck();
		if (!this.ready) {
			return;
		}

		if (this._oldValue ) {
			const changes = this._value.compare(this._oldValue);
			if (changes.s || changes.h) {
				this.onColorSet();
			}
		} else if (!this._oldValue && this._value) {
			this.onColorSet();
		}
		this._oldValue = this._value.toHSV();
	}

	draw() {

		// Create gradient

		let hueGrd = this.context.createLinearGradient(0, 90, this.width, 90);
		let lightnessGrd = this.context.createLinearGradient(0, 0, 0, this.height);

		// Add colors
		hueGrd.addColorStop(0, 'rgba(255, 0, 0, 1.000)');
		hueGrd.addColorStop(1 / 6, 'rgba(255, 255, 0, 1.000)');
		hueGrd.addColorStop(2 / 6, 'rgba(0, 255, 0, 1.000)');
		hueGrd.addColorStop(3 / 6, 'rgba(0, 255, 255, 1.000)');
		hueGrd.addColorStop(4 / 6, 'rgba(0, 0, 255, 1.000)');
		hueGrd.addColorStop(5 / 6, 'rgba(255, 0, 255, 1.000)');
		hueGrd.addColorStop(1, 'rgba(255, 0, 0, 1.000)');

		// Add white
		lightnessGrd.addColorStop(0, 'rgba( 255, 255, 255, 0 )');
		lightnessGrd.addColorStop(1, 'rgba( 255, 255, 255, 1 )');

		// Fill with gradient
		this.context.fillStyle = hueGrd;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.context.fillStyle = lightnessGrd;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);
	}

	getColorByPoint(x, y) {
		//let currentHSV = this._value.toHSV();
		this._value.setHue(360 * this.getPercentage(x, y, 'x'));
		this._value.setSaturation(this.getPercentage(x, y, 'y'));
		this.valueChange.emit(this._value.toHSV());
	}

	onColorSet() {
		if ( !this.trackingMove ) {
			let hue = this._value.toHSV().h;
			let pos = this.width * (hue / 360);

			this.setMarkerCenter(pos);
		}
		this.setMarkerColor();
	}

	setMarkerColor() {
		super.setMarkerColor();

		let hsl = TBColorHelpers.hsv2hsl({...this._value.toHSV(), v: 1});
		this.marker.nativeElement.style.setProperty('--color', 'hsl(' + hsl.h + ',' + hsl.s * 100 + '%,' + hsl.l * 100 + '% )');

	}

	getPercentage(x, y, key = 'x') {
		let coord;
		let dim;
		if (key == 'x') {
			coord = x;
			dim = this.width;
			return Math.min(1, Math.max(0, (coord / dim)));
		} else {
			coord = y;
			dim = this.height;
			return 1 - Math.min(1, Math.max(0, (coord / dim)));
		}
	}
}
