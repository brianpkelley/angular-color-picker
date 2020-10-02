export type Canvas<T> = new(...args: any[]) => T;


export interface IColor {
	hsv?: IColorHSV | string;
	hsl?: IColorHSL | string;
	rgb?: IColorRGB | string;
	hex?: IColorHEX | string;
	cmyk?: IColorCMYK | string;
	alpha?: number;
	h?: number;
	s?: number;
	v?: number;
	l?: number;

	r?: number;
	g?: number;
	b?: number;

	c?: number;
	m?: number;
	y?: number;
	k?: number;

	a?: number;
};

export interface IColorHSV {
	h: number;
	s: number;
	v: number;
	a?: number;
}

export interface IColorHSL {
	h: number;
	s: number;
	l: number;
	a?: number;
}

export interface IColorRGB {
	r: number;
	g: number;
	b: number;
	a?: number;
}

export interface IColorHEX {
	r?: number;
	g?: number;
	b?: number;
	a?: number;
}

export interface IColorCMYK {
	c: number;
	m: number;
	y: number;
	k: number;
	a?: number;
}

export interface ICoord {
	x: number;
	y: number;
}

export enum EOrientation {
	VERTICAL = 'vertical',
	HORIZONTAL = 'horizontal'
}
