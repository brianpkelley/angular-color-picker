import {Injectable} from '@angular/core';
import {Canvas} from './angular-color-picker.types';
import {Slider} from './sliders/slider';


@Injectable({
	providedIn: 'root'
})
export class AngularColorPickerService {

	private registry: { [key:string]: Canvas<Slider>; } = {};

	constructor() {
	}

	registerSlider(name: string, canvas: Canvas<Slider>) {
		this.registry[name] = canvas;
	}
	getSlider(name: string, component: string ) {
		return new this.registry[name]( component, this );
	}
}

