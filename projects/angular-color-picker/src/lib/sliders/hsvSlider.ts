import {IColorHSV} from '../angular-color-picker.types';
import {AngularColorPickerService} from '../angular-color-picker.service';
import {hsv2hsl} from '../util';
import {Slider} from './slider';


export class HsvSlider extends Slider {
	component: string;

	constructor(component: string, matColorPickerService: AngularColorPickerService) {
		super(component, matColorPickerService);
		if (component === 'h') {
			return matColorPickerService.getSlider('hue', this.component) as HsvSlider;
		}
	}

	shouldDraw(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (!oldValue || newValue.h !== oldValue.h || newValue.s !== oldValue.s || newValue.v !== oldValue.v) {
			return true;
		}
		return false;
	}

	shouldSetColor(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (oldValue && newValue) {
			if (!oldValue || newValue[this.component] !== oldValue[this.component]) {
				return true;
			}
			return false;
		} else if (!oldValue && newValue) {
			return true;
		}
		return false;
	}

	draw(value: IColorHSV, xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {

		switch (this.component) {
			case 's':
				xGradient.addColorStop(start, 'hsla( ' + value.h + ', 0%, ' + value.v * 100 + '%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + value.h + ', 100%, ' + value.v * 50 + '%, 1)');
				break;
			case 'v':
				let hsl = hsv2hsl(value);
				xGradient.addColorStop(start, 'hsla( ' + value.h + ', ' + value.s * 100 + '%, 0%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + value.h + ', ' + value.s * 100 + '%, ' + (100 - (value.s * 50)) + '%, 1)');
				break;
		}
	}

	getColorByPercent(value: IColorHSV, xPercent: number, yPercent: number): IColorHSV {
		let currentHSV = {...value};
		currentHSV[this.component] = xPercent;
		return currentHSV;
	}

	setColor(value: IColorHSV): number {
		return value[this.component];
	}

	setMarkerColor(value: IColorHSV, el: HTMLElement) {
		let hsl = hsv2hsl(value);
		el.style.setProperty('--color', 'hsl(' + hsl.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '% )');
	}
}
