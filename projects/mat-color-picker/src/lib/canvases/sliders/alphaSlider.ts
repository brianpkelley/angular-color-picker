import {IColorHSV, TBMCPCanvas} from '../../mat-color-picker.types';
import {MatColorPickerService} from '../../mat-color-picker.service';
import {brightness, hsv2hsl, hsv2rgb} from '../../util';


export class AlphaSlider extends TBMCPCanvas {
	constructor( public component: string, matColorPickerService: MatColorPickerService) {
		super( component, matColorPickerService );
	}

	shouldDraw(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (!oldValue || newValue.h !== oldValue.h || newValue.s !== oldValue.s || newValue.v !== oldValue.v ) {
			return true;
		}
		return false;
	}

	shouldSetColor(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		if (oldValue && newValue) {
			if ( newValue.h !== oldValue.h || newValue.s !== oldValue.s || newValue.v !== oldValue.v ) {
				return true;
			}
			return false;
		} else if (!oldValue && newValue) {
			return true;
		}
		return false;
	}

	draw(value: IColorHSV, xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {

		var colorRGB = hsv2rgb( value );

		// Add colors
		xGradient.addColorStop( start, 'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 0.000)');
		xGradient.addColorStop( end, 'rgba(' + colorRGB.r + ',' + colorRGB.g + ',' + colorRGB.b + ', 1.000)');
	}

	getColorByPercent(value: IColorHSV, xPercent: number, yPercent: number): IColorHSV {
		let currentHSV = {...value};
		currentHSV.a = xPercent;
		return currentHSV;
	}

	setColor(value: IColorHSV): number {
		return value.a;
	}

	setMarkerColor(value: IColorHSV, el: HTMLElement) {
		let hsl = hsv2hsl( value );
		el.style.setProperty('--color', 'hsla(' + hsl.h + ', ' + hsl.s*100 + '%, ' + hsl.l*100 + '%,' + hsl.a + ' )');
	}


}
