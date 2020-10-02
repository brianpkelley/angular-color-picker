import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorComponent} from '../color.component';

@Component({
	selector: 'tb-hue-spectrum',
	templateUrl: './hue-spectrum.component.html',
	styleUrls: ['./hue-spectrum.component.scss']
})
export class HueSpectrumComponent extends ColorComponent {
}
