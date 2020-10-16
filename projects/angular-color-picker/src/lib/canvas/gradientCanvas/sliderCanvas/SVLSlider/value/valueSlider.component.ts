import {SVLSlider} from '../SVLSlider';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'tb-value-slider',
	templateUrl: '../../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class ValueSliderComponent extends SVLSlider {
	component = 'v';

	getValue() {
		return this._value.toHSV();
	}
}
