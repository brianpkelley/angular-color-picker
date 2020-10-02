import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output} from '@angular/core';
import {EOrientation, IColor, IColorHSV} from '../../angular-color-picker.types';

@Component({
	selector: 'lib-color',
	templateUrl: './color.component.html',
	styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit, OnChanges {


	@Input() value: IColor;
	@Output() valueChange: EventEmitter<IColorHSV> = new EventEmitter<IColorHSV>();

	@Input() showAlpha: boolean = true;
	@Input() sliderOrientation: EOrientation = EOrientation.VERTICAL;
	@Input() alphaOrientation: EOrientation;
	@Input() markerClass: string = 'circle-filled';

	EOrientation = EOrientation;

	//@HostBinding('style.flexDirection') public flexDirection = 'row'

	constructor() {
	}

	ngOnInit(): void {
		this.alphaOrientation = this.alphaOrientation || this.sliderOrientation;
	}

	ngOnChanges( changes ): void {}

	onValueChange(val) {
		this.value = val;
		this.valueChange.emit(val);
	}

}
