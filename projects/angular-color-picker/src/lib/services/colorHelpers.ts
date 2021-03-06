import {colorIsHSL, colorIsHSV, colorIsRGB, IColor, IColorCMYK, IColorHSL, IColorHSV, IColorRGB} from '../angular-color-picker.types';


export class TBColorHelpers {
	static brightness(c: IColor): number {
		let color = TBColorHelpers.color2rgb(c);
		return Math.sqrt(
			color.r * color.r * .241 +
			color.g * color.g * .691 +
			color.b * color.b * .068
		);
	}

	static hsv2hsl({h, s, v, a}: IColorHSV): IColorHSL {
		const l: number = v - v * s / 2;
		const m: number = Math.min(l, 1 - l);
		return ({h, s: m ? (v - l) / m : 0, l, a: a !== undefined ? a : 1});
	}

	static hsl2hsv({h, s, l, a}: IColorHSL): IColorHSV {
		const v = s * Math.min(l, 1 - l) + l;
		return ({h, s: v ? 2 - 2 * l / v : s, v, a: a !== undefined ? a : 1});
	}

	static hsv2rgb({h, s, v, a}: IColorHSV): IColorRGB {
		let r, g, b, i, f, p, q, t;
		if (s == 0) {
			// Achromatic (grey)
			r = g = b = v;
			let val = Math.round(r * 255);
			return {
				r: val,
				g: val,
				b: val
			};
		}

		h /= 60; // sector 0 to 6 (6 = 360)
		i = Math.floor(h);
		f = h - i; // factorial part of h
		p = v * (1 - s);
		q = v * (1 - s * f);
		t = v * (1 - s * (1 - f));

		switch (i) {
			case 6:
			case 0:
				r = v;
				g = t;
				b = p;
				break;

			case 1:
				r = q;
				g = v;
				b = p;
				break;

			case 2:
				r = p;
				g = v;
				b = t;
				break;

			case 3:
				r = p;
				g = q;
				b = v;
				break;

			case 4:
				r = t;
				g = p;
				b = v;
				break;

			default: // case 5:
				r = v;
				g = p;
				b = q;
		}

		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255),
			a: a !== undefined ? a : 1

		};
	}

	static rgb2hsv({r, g, b, a}: IColorRGB): IColorHSV {
		var rr, gg, bb,
			r = r / 255,
			g = g / 255,
			b = b / 255,
			h, s,
			v = Math.max(r, g, b),
			diff = v - Math.min(r, g, b),
			diffc = function (c) {
				return (v - c) / 6 / diff + 1 / 2;
			};

		if (diff == 0) {
			h = s = 0;
		} else {
			s = diff / v;
			rr = diffc(r);
			gg = diffc(g);
			bb = diffc(b);

			if (r === v) {
				h = bb - gg;
			} else if (g === v) {
				h = (1 / 3) + rr - bb;
			} else if (b === v) {
				h = (2 / 3) + gg - rr;
			}
			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}
		return {
			h: h * 360,
			s: s,
			v: v,
			a: a !== undefined ? a : 1
		};

	}

	static hex2rgb(hex: string): IColorRGB {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: result[4] ? parseInt(result[4], 16) : undefined
		} : null;
	}

	static rgb2hex({r, g, b}: IColorRGB): string {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	static rgb2cmyk({r, g, b}: IColorRGB): IColorCMYK {
		var computedC = 0;
		var computedM = 0;
		var computedY = 0;
		var computedK = 0;

		//remove spaces from input RGB values, convert to int
		var r = parseInt(('' + r).replace(/\s/g, ''), 10);
		var g = parseInt(('' + g).replace(/\s/g, ''), 10);
		var b = parseInt(('' + b).replace(/\s/g, ''), 10);

		if (r == null || g == null || b == null ||
			isNaN(r) || isNaN(g) || isNaN(b)) {
			alert('Please enter numeric RGB values!');
			return;
		}
		if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
			alert('RGB values must be in the range 0 to 255.');
			return;
		}

		// BLACK
		if (r == 0 && g == 0 && b == 0) {
			computedK = 1;
			return {c: 0, m: 0, y: 0, k: 1};
		}

		computedC = 1 - (r / 255);
		computedM = 1 - (g / 255);
		computedY = 1 - (b / 255);

		var minCMY = Math.min(computedC,
			Math.min(computedM, computedY));
		computedC = (computedC - minCMY) / (1 - minCMY);
		computedM = (computedM - minCMY) / (1 - minCMY);
		computedY = (computedY - minCMY) / (1 - minCMY);
		computedK = minCMY;

		return {
			c: computedC,
			m: computedM,
			y: computedY,
			k: computedK
		};
	}

	static color2rgb(color: string)
	static color2rgb(color: IColor)
	static color2rgb(color: IColor | string): IColorRGB {
		let rgb;
		if (typeof color === 'string') {
			rgb = TBColorHelpers.string2rgb(color as string);
		} else {
			if (colorIsRGB(color)) {
				rgb = {
					r: color.r,
					g: color.g,
					b: color.b
				};
			} else if (colorIsHSV(color)) {
				rgb = TBColorHelpers.hsv2rgb(color as IColorHSV);
			} else if (colorIsHSL(color)) {
				rgb = TBColorHelpers.hsv2rgb(TBColorHelpers.hsl2hsv(color as IColorHSL));
			}
			rgb.a = color.a !== undefined ? Number(color.a) : 1;
		}

		return rgb;
	}

	static string2rgb(val: string) {

		let rgbTest = /^rgba?\((\d*?),\s?(\d*?),\s?(\d*?)(?:,\s?([\d\.]*?))?\)$/i;
		let hslTest = /^hsla?\((\d*?),\s?(\d*?)%,\s?(\d*?)%(?:,\s?([\d\.]*?))?\)$/i;
		let hsvTest = /^hsva?\((\d*?),\s?([\d\.]*?)%?,\s?([\d\.]*?)%?(?:,\s?([\d\.]*?))?\)$/i;
		let hex68Test = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{0,2})$/i;
		let hex34Test = /^([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i;

		val = val.trim();
		val = val.replace('#', '');

		let result;
		let rgb;
		if (result = rgbTest.exec(val)) {
			rgb = {r: Number(result[1]), g: Number(result[2]), b: Number(result[3])};
			if (result[4]) {
				rgb.a = Number(result[4]);
			}
			return rgb;
		}
		if (result = hslTest.exec(val)) {
			let hsl;
			hsl = {h: result[1], s: result[2], l: result[3]};
			if (result[4]) {
				hsl.a = result[4];
			}
			return TBColorHelpers.hsv2rgb(TBColorHelpers.hsl2hsv(hsl));
		}
		if (result = hsvTest.exec(val)) {
			let hsv;
			hsv = {h: result[1], s: result[2], v: result[3]};
			if (result[4]) {
				hsv.a = result[4];
			}
			return TBColorHelpers.hsv2rgb(hsv);
		}
		if (result = hex68Test.exec(val)) {
			let rgb = {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
				a: result[4] ? parseInt(result[4], 16) : undefined
			};
			return rgb;
		}
		if (result = hex34Test.exec(val)) {
			let rgb = {
				r: parseInt('' + result[1] + result[1], 16),
				g: parseInt('' + result[2] + result[2], 16),
				b: parseInt('' + result[3] + result[3], 16),
				a: result[4] ? parseInt('' + result[4] + result[4], 16) : undefined
			};
			return rgb;
		}

	}
}
