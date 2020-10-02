import {AngularColorPickerService} from '../angular-color-picker.service';
import {IColorHSV} from '../angular-color-picker.types';

export abstract class Slider {
	protected component: string;
	protected constructor (component: string, matColorPickerService: AngularColorPickerService) {
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
