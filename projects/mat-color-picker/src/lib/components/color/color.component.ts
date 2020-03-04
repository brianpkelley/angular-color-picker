import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output} from '@angular/core';
import {EOrientation, IColor, IColorHSV} from '../../mat-color-picker.types';

@Component({
	selector: 'lib-color',
	templateUrl: './color.component.html',
	styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnChanges {


	@Input() value: IColor;
	@Output() valueChange: EventEmitter<IColorHSV> = new EventEmitter<IColorHSV>();

	@Input() showAlpha: boolean = true;
	@Input() sliderOrientation: EOrientation = EOrientation.VERTICAL;

	@HostBinding('style.flexDirection') public flexDirection = 'row'

	constructor() {
	}

	ngOnChanges( changes ): void {
		if ( changes.sliderOrientation ) {
			if (changes.sliderOrientation.currentValue === EOrientation.HORIZONTAL) {
				this.flexDirection = 'column';
			} else {
				this.flexDirection = 'row';
			}
		}
	}


}
