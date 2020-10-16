export type Constructor<T> = new(...args: any[]) => T;


export type IColor =
	| IColorCMYK
	| IColorHEX
	| IColorHSL
	| IColorHSV
	| IColorRGB;


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

export interface IColorChanges {
	h?: number;
	s?: number;
	v?: number;
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


export function colorIsRGB(color: IColor): color is IColorRGB {
	return 'r' in color;
}

export function colorIsHSV(color: IColor): color is IColorHSV {
	return 'v' in color;
}

export function colorIsHSL(color: IColor): color is IColorHSL {
	return 'l' in color;
}

export function colorIsCMYK(color: IColor): color is IColorCMYK {
	return 'c' in color;
}
