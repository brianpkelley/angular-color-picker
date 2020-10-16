import {IColorHSV} from '../../../../angular-color-picker.types';
import {Component, ViewEncapsulation} from '@angular/core';
import {SliderCanvas} from '../sliderCanvas.component';

@Component({
	selector: 'tb-alpha-slider',
	templateUrl: '../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class AlphaSliderComponent extends SliderCanvas {

	shouldDraw(): boolean {
		const changes = this._value.compare(this._oldValue);
		if (changes.h || changes.s || changes.v) {
			return true;
		}
		return false;
	}

	shouldSetColor(): boolean {
		const changes = this._value.compare(this._oldValue);
		if (changes.h || changes.s || changes.v) {
			return true;
		}
		return false;
	}

	fill( xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {
		const colorRGB = this._value.toRGB();

		// Add colors
		xGradient.addColorStop(start, 'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 0.000)');
		xGradient.addColorStop(end, 'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 1.000)');
	}

	getColorByPercent(percent): IColorHSV {
		let currentHSV = {...this._value.toHSV()};
		currentHSV.a = percent;
		return currentHSV;
	}

	setColor(): number {
		return this._value.color.a;
	}

	setMarkerColor() {
		let hsl = this._value.toHSL();
		this.marker.nativeElement.style.setProperty('--color', 'hsla(' + hsl.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '%,' + hsl.a + ' )');
	}


}
