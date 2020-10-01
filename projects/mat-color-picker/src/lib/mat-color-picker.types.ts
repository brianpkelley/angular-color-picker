import {MatColorPickerService} from './mat-color-picker.service';

export type Canvas<T> = new(...args: any[]) => T;

export abstract class TBMCPCanvas {
	protected component: string;
	protected constructor (component: string, matColorPickerService: MatColorPickerService) {
		this.component = component;
	};
	//width: number;
	//height: number;
	abstract shouldDraw( newValue: IColorHSV, oldValue: IColorHSV ) : boolean;
	abstract shouldSetColor( newValue: IColorHSV, oldValue: IColorHSV ) : boolean;
	abstract draw( value:IColorHSV, xGradient:CanvasGradient, yGradientCanvasGradient, start:number, end: number): void;
	abstract getColorByPercent( value: IColorHSV, xPercent: number, yPercent: number ): IColorHSV;
	abstract setColor( value: IColorHSV ): number;
	abstract setMarkerColor( value: IColorHSV, el: HTMLElement ): void;

}


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
