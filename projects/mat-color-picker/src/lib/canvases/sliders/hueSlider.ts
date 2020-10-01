import {IColorHSV, TBMCPCanvas} from '../../mat-color-picker.types';
import {MatColorPickerService} from '../../mat-color-picker.service';


export class HueSlider extends TBMCPCanvas {
	constructor( public component: string, matColorPickerService: MatColorPickerService) {
		super( component, matColorPickerService );
	}

	shouldDraw(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (!oldValue) {
			return true;
		}
		return false;
	}

	shouldSetColor(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (oldValue && newValue) {
			if (!oldValue || newValue.h !== oldValue.h) {
				return true;
			}
			return false;
		} else if (!oldValue && newValue) {
			return true;
		}
		return false;
	}

	draw(value: IColorHSV, xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {

		// Add colors
		xGradient.addColorStop(start, 'rgba(255, 0, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 1 / 6), 'rgba(255, 255, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 2 / 6), 'rgba(0, 255, 0, 1.000)');
		xGradient.addColorStop(Math.abs(start - 3 / 6), 'rgba(0, 255, 255, 1.000)');
		xGradient.addColorStop(Math.abs(start - 4 / 6), 'rgba(0, 0, 255, 1.000)');
		xGradient.addColorStop(Math.abs(start - 5 / 6), 'rgba(255, 0, 255, 1.000)');
		xGradient.addColorStop(end, 'rgba(255, 0, 0, 1.000)');

	}

	getColorByPercent(value: IColorHSV, xPercent: number, yPercent: number): IColorHSV {
		let currentHSV = value;
		let h = 360 * xPercent;
		let s = currentHSV.s;
		let v = currentHSV.v;
		let a = currentHSV.a;

		return {
			h: h,
			s: s,
			v: v,
			a: a
		};
	}

	setColor(value: IColorHSV): number {
		return value.h / 360;
	}

	setMarkerColor(value: IColorHSV, el: HTMLElement) {
		el.style.setProperty('--color', 'hsl(' + value.h + ', 100%, 50% )');
	}
}
