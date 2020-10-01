import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorComponent} from '../color/color.component';
import {ComponentSliderCanvasComponent} from '../../canvas/componentSliderCanvas.component';
import {HueLightnessCanvasComponent} from '../../canvas/hueLightnessCanvas.component';


@Component({
	selector: 'tb-hue-lightness',
	templateUrl: './hue-lightness.component.html',
	styleUrls: ['./hue-lightness.component.scss']
})
export class HueLightnessComponent extends ColorComponent {
}
