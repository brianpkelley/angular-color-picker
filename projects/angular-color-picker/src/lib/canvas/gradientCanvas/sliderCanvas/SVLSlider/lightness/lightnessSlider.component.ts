import {SVLSlider} from '../SVLSlider';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'tb-lightness-slider',
	templateUrl: '../../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class LightnessSliderComponent extends SVLSlider {
	component = 'l';

	getValue() {
		return this._value.toHSL();
	}
}
