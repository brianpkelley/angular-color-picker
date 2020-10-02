import {IColorHSV} from '../angular-color-picker.types';
import {AngularColorPickerService} from '../angular-color-picker.service';
import {hsl2hsv, hsv2hsl} from '../util';
import {Slider} from './slider';


export class HslSlider extends Slider {
	component: string;

	constructor(component: string, matColorPickerService: AngularColorPickerService) {
		super(component, matColorPickerService);
		if (component === 'h') {
			return matColorPickerService.getSlider('hue', this.component) as HslSlider;
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
		let hsl = hsv2hsl(value);

		switch (this.component) {
			case 's':
				xGradient.addColorStop(start, 'hsla( ' + hsl.h + ', 0%, ' + hsl.l * 100 + '%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + hsl.h + ', 100%, ' + hsl.l * 100 + '%, 1)');
				break;
			case 'l':
				xGradient.addColorStop(start, 'hsla( ' + hsl.h + ', ' + hsl.s * 100 + '%, 0%, 1)');
				xGradient.addColorStop(0.5, 'hsla( ' + hsl.h + ', ' + hsl.s * 100 + '%, 50%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + hsl.h + ', ' + hsl.s * 100 + '%, 100%, 1)');
				break;
		}
	}

	getColorByPercent(value: IColorHSV, xPercent: number, yPercent: number): IColorHSV {
		let currentHSL = hsv2hsl(value);
		currentHSL[this.component] = xPercent;
		return hsl2hsv(currentHSL);
	}

	setColor(value: IColorHSV): number {
		let color = hsv2hsl(value as IColorHSV);
		return color[this.component];
	}

	setMarkerColor(value: IColorHSV, el: HTMLElement) {
		let hsl = hsv2hsl(value);
		el.style.setProperty('--color', 'hsl(' + hsl.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '% )');
	}
}
