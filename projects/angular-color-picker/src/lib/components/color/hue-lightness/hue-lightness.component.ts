import {Component} from '@angular/core';
import {ColorComponent} from '../color.component';


@Component({
	selector: 'tb-hue-lightness',
	templateUrl: './hue-lightness.component.html',
	styleUrls: ['./hue-lightness.component.scss']
})
export class HueLightnessComponent extends ColorComponent {
}
