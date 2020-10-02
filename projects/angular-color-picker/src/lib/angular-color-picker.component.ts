import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IColor} from './angular-color-picker.types';

@Component({
	selector: 'tb-mat-color-picker',
	template: `
		<p>
			mat-color-picker works!
		</p>
	`,
	styles: []
})
export class AngularColorPickerComponent implements OnInit {

	@Input('value') model: IColor | string;
	@Output('value') modelChange: EventEmitter<IColor|string>;

	constructor() {
	}

	ngOnInit() {
	}

}
