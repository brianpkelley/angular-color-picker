import {IColorHSV} from '../../../../angular-color-picker.types';
import {TBColorHelpers} from '../../../../services/colorHelpers';
import {SliderCanvas} from '../sliderCanvas.component';


export abstract class SVLSlider extends SliderCanvas {
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
		if (changes.h || changes.s || changes.v) {
			return true;
		}
		return false;
	}

	fill(xGradient: CanvasGradient, yGradient: CanvasGradient, start = 0, end = 1) {
		let color = this._value.toHSL();
		switch( this.component ) {
			case 's':
				xGradient.addColorStop(start, 'hsla( ' + color.h + ', 0%, ' + color.l * 100 + '%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + color.h + ', 100%, ' + color.l * 100 + '%, 1)');
				break;
			case 'v':
				xGradient.addColorStop(start, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 0%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, ' + (100 - (color.s * 50)) + '%, 1)');
				break;
			case 'l':
				xGradient.addColorStop(start, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 0%, 1)');
				xGradient.addColorStop(0.5, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 50%, 1)');
				xGradient.addColorStop(end, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 100%, 1)');
				break;
		}

	}

	getColorByPercent(percent: number): IColorHSV {
		let current = this.getValue();
		current[this.component] = percent;
		return TBColorHelpers.rgb2hsv( TBColorHelpers.color2rgb(current) );
	}

	setColor(): number {
		return this._value.toHSL().s;
	}

	setMarkerColor() {
		let hsl = this._value.toHSL();
		this.marker.nativeElement.style.setProperty('--color', 'hsl(' + hsl.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '% )');
	}

	abstract getValue();
}
