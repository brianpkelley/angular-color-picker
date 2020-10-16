import {RGBSlider} from '../RGBSlider';
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'tb-blue-slider',
	templateUrl: '../../../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class RedSliderComponent extends RGBSlider {
	component = 'r';
}
