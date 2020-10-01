import {Injectable} from '@angular/core';
import {Canvas, TBMCPCanvas} from './mat-color-picker.types';


@Injectable({
	providedIn: 'root'
})
export class MatColorPickerService {

	private registry: { [key:string]: Canvas<TBMCPCanvas>; } = {};

	constructor() {
	}

	registerCanvas(name: string, canvas: Canvas<TBMCPCanvas>) {
		this.registry[name] = canvas;
	}
	getCanvas( name: string, component: string ) {
		return new this.registry[name]( component, this );
	}
}

