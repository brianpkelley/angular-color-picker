import {Component} from '@angular/core';
import {ColorComponent} from '../color.component';

@Component({
	selector: 'tb-wheel-value',
	templateUrl: './wheel-value.component.html',
	styleUrls: ['./wheel-value.component.scss']
})
export class WheelValueComponent extends ColorComponent {

	onValueChange(val) {
		this.value = val;
		this.valueChange.emit(val);
	}


}

