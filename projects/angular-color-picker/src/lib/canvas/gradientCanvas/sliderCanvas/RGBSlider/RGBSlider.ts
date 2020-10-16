import {IColorHSV} from '../../../../angular-color-picker.types';
import {TBColorHelpers} from '../../../../services/colorHelpers';
import {SliderCanvas} from '../sliderCanvas.component';


export abstract class RGBSlider extends SliderCanvas {
	protected component;


	shouldDraw(): boolean {
		const changes = this._value.compare(this._oldValue);
		if (changes.h || changes.s || changes.v) {
			return true;
		}
		return false;
	}

	shouldSetColor(): boolean {
		const changes = this._value.compare(this._oldValue);
		if (changes[this.component]) {
			// Changes, redraw
			return true;
		}
		// No changes, don't redraw
		return false;
	}

	getChanges() {
		const changes = {};

		const rgb = this._value.toRGB()
		const oldRgb = TBColorHelpers.hsv2rgb( this._oldValue );

		Object.keys( rgb ).forEach( ( key ) => {
			if ( rgb[key] !== oldRgb[key] ) {
				changes[key] = true;
			}
		})
	}

	fill(xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {
		const color = this._value.toRGB();

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

	getColorByPercent(percent: number): IColorHSV {
		let rgba = this._value.toRGB();
		let sliderVal = 255 * percent;
		switch (this.component) {
			case 'r':
				return TBColorHelpers.rgb2hsv({...rgba, r: sliderVal}) as IColorHSV;
				break;
			case 'g':
				return TBColorHelpers.rgb2hsv({...rgba, g: sliderVal}) as IColorHSV;
				break;
			case 'b':
				return TBColorHelpers.rgb2hsv({...rgba, b: sliderVal}) as IColorHSV;
				break;
		}
		return;
	}

	setColor(): number {
		return this._value.toRGB()[this.component]  / 255;
	}

	//setMarkerColor() {
	//	let hsl = this._value.toRGB();
	//	this.marker.nativeElement.style.setProperty('--color', 'hsl(' + hsl[this.component] + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '% )');
	//}

}
