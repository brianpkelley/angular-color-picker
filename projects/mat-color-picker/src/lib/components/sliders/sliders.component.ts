import {Component, Input} from '@angular/core';
import {ColorComponent} from '../color/color.component';
import {hsl2hsv, hsv2hsl, hsv2rgb, rgb2hsv} from '../../util';
import {IColorHSV} from '../../mat-color-picker.types';
import {copyAssets} from '@angular-devkit/build-angular/src/utils/copy-assets';

@Component({
	selector: 'tb-sliders',
	templateUrl: './sliders.component.html',
	styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent extends ColorComponent {
	@Input() showLabels: boolean = true;
	@Input() showValues: boolean = true;

	_components: string[];

	get components(): string {
		return this._components.join('');
	}

	@Input('components')
	set components(val: string) {
		this._components = val.split('');
	}

	getComponentValue(component): number {
		let val;

		switch (this.components) {
			case 'rgb':
				val = hsv2rgb(this.value as IColorHSV);
				break;
			case 'hsv':
				val = this.value;
				break;
			case 'hsl':
				val = hsv2hsl(this.value as IColorHSV);
				break;
		}

		switch( component ) {
			case 's':
			case 'l':
			case 'v':
			case 'a':
				return val[component] * 100;
			default:
				return val[component];
		}




	}

	onComponentValueChange(val: number, component) {
		console.log(val, component);
		let _val;
		let newVal;
		switch( component ) {
			case 's':
			case 'l':
			case 'v':
			case 'a':
				val = val / 100;
				break;
			default:
				break;
		}
		if (component === 'a') {
			newVal = {...this.value, a: val };
		} else {

			switch (this.components) {
				case 'rgb':
					_val = hsv2rgb(this.value as IColorHSV);
					console.log(_val, component);

					_val[component] = val;
					console.log(_val, component);
					newVal = rgb2hsv(_val);
					console.log(newVal, component);
					break;
				case 'hsv':
					_val = this.value;
					_val[component] = val;
					newVal = _val;
					break;
				case 'hsl':
					_val = hsv2hsl(this.value as IColorHSV);
					_val[component] = val;
					newVal = hsl2hsv(_val);
					break;
			}
		}

		this.onValueChange( newVal );
	}

	getComponentMax( component ) {
		switch( component ) {
			case 'h': return 360;
			case 's':
			case 'l':
			case 'v':
			case 'a': return 100;
			case 'r':
			case 'g':
			case 'b': return 255;
		}
	}
}
