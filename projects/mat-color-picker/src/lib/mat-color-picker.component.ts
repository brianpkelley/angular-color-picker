import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IColor} from './mat-color-picker.types';

@Component({
	selector: 'tb-mat-color-picker',
	template: `
		<p>
			mat-color-picker works!
		</p>
	`,
	styles: []
})
export class MatColorPickerComponent implements OnInit {

	@Input('value') model: IColor | string;
	@Output('value') modelChange: EventEmitter<IColor|string>;

	constructor() {
	}

	ngOnInit() {
	}

}
