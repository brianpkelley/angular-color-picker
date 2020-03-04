import {Component, OnInit} from '@angular/core';
import {ColorComponent} from '../color/color.component';

@Component({
	selector: 'tb-wheel-lightness',
	templateUrl: './wheel-lightness.component.html',
	styleUrls: ['./wheel-lightness.component.scss']
})
export class WheelLightnessComponent extends ColorComponent {

	onValueChange(val) {
		this.value = val;
		this.valueChange.emit(val);
	}


}
