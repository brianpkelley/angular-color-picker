import {color2rgb, hsv2rgb, rgb2hsv} from '../../util';
import {EOrientation, IColorHSV, TBMCPCanvas} from '../../mat-color-picker.types';
import {SliderCanvas} from '../../canvas/sliderCanvas.component';
import {Input} from '@angular/core';
import {MatColorPickerService} from '../../mat-color-picker.service';


export class RgbSlider extends TBMCPCanvas  {

	constructor( public component: string, matColorPickerService: MatColorPickerService ) {
		super( component, matColorPickerService );
	}

	shouldDraw( newValue: IColorHSV, oldValue: IColorHSV ) {
		if ( oldValue ) {
			if (newValue.h !== oldValue.h || newValue.s !== oldValue.s || newValue.v !== oldValue.v) {
				// Changes, redraw
				return true;
			}
			// No changes, don't redraw
			return false;
		}
		// Initial Draw
		return true;
	}


	shouldSetColor(newValue: IColorHSV, oldValue: IColorHSV): boolean {
		let newRgb = hsv2rgb( newValue );
		if ( oldValue ) {
			let oldRgb = hsv2rgb( oldValue );

			if ( newRgb[this.component] !== oldRgb[this.component] ) {
				// Changes, redraw
				return true;
			}
			// No changes, don't redraw
			return false;
		}
		// Initial Draw
		return true;
	}

	draw( value:IColorHSV, xGradient:CanvasGradient, yGradientCanvasGradient, start:number = 0, end: number = 1) {

		let color = color2rgb( value );

		switch (this.component) {
			case 'r':
				xGradient.addColorStop(start, 'rgba( 0, ' + color.g + ', ' + color.b + ', 1)');
				xGradient.addColorStop(end, 'rgba( 255, ' + color.g + ', ' + color.b + ', 1)');
				break;
			case 'g':
				xGradient.addColorStop(start, 'rgba(' + color.r + ', 0, ' + color.b + ', 1)');
				xGradient.addColorStop(end, 'rgba(' + color.r + ', 255, ' + color.b + ', 1)');
				break;
			case 'b':
				xGradient.addColorStop(start, 'rgba(' + color.r + ', ' + color.g + ', 0, 1)');
				xGradient.addColorStop(end, 'rgba(' + color.r + ', ' + color.g + ', 255, 1)');
				break;
		}
	}

	getColorByPercent(value: IColorHSV, xPercent: number, yPercent: number): IColorHSV {
		let rgba = hsv2rgb( value as IColorHSV );
		let sliderVal = 255 * xPercent;
		switch (this.component) {
			case 'r':
				return rgb2hsv({...rgba, r: sliderVal}) as IColorHSV;
				break;
			case 'g':
				return rgb2hsv({...rgba, g: sliderVal}) as IColorHSV;
				break;
			case 'b':
				return rgb2hsv({...rgba, b: sliderVal}) as IColorHSV;
				break;
		}
		return
	}

	setColor( value: IColorHSV ) {
		let color = hsv2rgb( value );
		return color[this.component] / 255;
	}

	setMarkerColor(value:IColorHSV, el:HTMLElement) {
		// does nothing
	}
}
