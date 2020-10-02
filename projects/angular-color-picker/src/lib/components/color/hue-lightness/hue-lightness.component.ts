import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorComponent} from '../color.component';
import {ComponentSliderCanvasComponent} from '../../../canvas/sliderCanvas/componentSliderCanvas/componentSliderCanvas.component';
import {HueLightnessCanvasComponent} from '../../../canvas/gradientCanvas/hueLightnessCanvas/hueLightnessCanvas.component';


@Component({
	selector: 'tb-hue-lightness',
	templateUrl: './hue-lightness.component.html',
	styleUrls: ['./hue-lightness.component.scss']
})
export class HueLightnessComponent extends ColorComponent {
}
