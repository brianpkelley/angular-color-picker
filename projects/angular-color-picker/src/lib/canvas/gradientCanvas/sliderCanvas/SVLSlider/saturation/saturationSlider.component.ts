import {SVLSlider} from '../SVLSlider';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'tb-saturation-slider',
	templateUrl: '../../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class SaturationSliderComponent extends SVLSlider {
	component = 's';

	getValue() {
		return this._value.toHSL();
	}
}
