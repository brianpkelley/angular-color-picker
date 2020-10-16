import {IColorHSV} from '../../../../angular-color-picker.types';
import {SliderCanvas} from '../sliderCanvas.component';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'tb-hue-slider',
	templateUrl: '../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class HueSliderComponent extends SliderCanvas {

	shouldDraw(): boolean {
		return false;
	}

	shouldSetColor(): boolean {
		const changes = this._value.compare(this._oldValue);
		if (changes.h) {
			return true;
		}
		return false;
	}

	fill(xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {

		// Add colors
		xGradient.addColorStop(start, 'rgba(255, 0, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 1 / 6), 'rgba(255, 255, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 2 / 6), 'rgba(0, 255, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 3 / 6), 'rgba(0, 255, 255, 1.000)');
		xGradient.addColorStop(Math.abs(start - 4 / 6), 'rgba(0, 0, 255, 1.000)');
		xGradient.addColorStop(Math.abs(start - 5 / 6), 'rgba(255, 0, 255, 1.000)');
		xGradient.addColorStop(end, 'rgba(255, 0, 0, 1.000)');

	}

	getColorByPercent(percent: number): IColorHSV {
		let currentHSV = this._value.toHSV();
		currentHSV.h = 360 * percent;
		return currentHSV;
	}

	setColor(): number {
		return this._value.toHSV().h / 360;
	}

	setMarkerColor() {
		this.marker.nativeElement.style.setProperty('--color', 'hsl(' + this._value.toHSV().h + ', 100%, 50% )');
	}
}

