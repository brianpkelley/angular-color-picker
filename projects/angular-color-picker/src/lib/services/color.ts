import {colorIsHSL, colorIsHSV, IColor, IColorChanges, IColorCMYK, IColorHSL, IColorHSV, IColorRGB} from '../angular-color-picker.types';
import {TBColorHelpers} from './colorHelpers';

export class TBColor {
	private value: IColorHSV = {
		h: 0,
		s: 0,
		v: 0,
		a: 100
	};

	constructor( value: IColor) {
		console.log( "NEW COLOR ", value );
		this.value = { ...this.value, ...TBColorHelpers.rgb2hsv(TBColorHelpers.color2rgb(value)) };
	}

	get color(): IColor {
		return this.value;
	}

	set color(value: IColor) {
		this.value = TBColorHelpers.rgb2hsv(TBColorHelpers.color2rgb(value));
		if( this.value.s === 0 && ( colorIsHSL( value ) || colorIsHSV( value ) ) ) {
			this.value.h = value.h;
		}
	}

	toRGB() : IColorRGB {
		return TBColorHelpers.hsv2rgb(this.value);
	}

	toHSV() : IColorHSV {
		return this.value;
	}

	toHSL() : IColorHSL {
		return TBColorHelpers.hsv2hsl(this.value);
	}

	toCMYK() : IColorCMYK {
		return TBColorHelpers.rgb2cmyk(TBColorHelpers.hsv2rgb(this.value));
	}

	toGray(): IColorHSV {
		return this.value;
	}

	toHSLString() {
		return ""
	}

	setHue(val: number) {
		if (val > 0) {
			this.value.h = val % 360;
		} else {
			this.value.h = 360 + (val % 360);
		}
	}

	setSaturation(val) {
		this.setProp(val, 's');
	}

	setValue(val) {
		this.setProp(val, 'v');
	}

	private setProp(val, key) {
		//if ( val > 0 && val < 1 ) {
		//	val *= 100;
		//}
		//if (val > 0) {
			this.value[key] = ( val % 100 );
		//} else {
		//	this.value[key] /= ( 1 + (val % 100) );
		//}
	}

	getBrightness(): number {
		return TBColorHelpers.brightness( this.value );
	}

	compare( val:IColorHSV ) : IColorChanges {
		const changes = {};
		if ( !val ) {
			Object.keys( this.value ).forEach( ( key ) => {
				changes[key] = true;
			})
		} else {
			Object.keys(this.value).forEach((key) => {
				if (val[key] !== this.value[key]) {
					changes[key] = true;
				}
			});
		}
		return changes;
	}

}
