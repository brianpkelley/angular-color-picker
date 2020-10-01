import {Component, DoCheck, ViewEncapsulation} from '@angular/core';
import {SliderCanvas} from './sliderCanvas.component';
import {brightness, hsv2rgb} from '../util';


@Component({
	selector: 'tb-alpha-canvas',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class AlphaCanvasComponent extends SliderCanvas implements DoCheck {
	public type = 'alpha';


	ngOnInit() {
		super.ngOnInit();
	}

	ngDoCheck() {
		super.ngDoCheck();
		if ( !this.ready ) {
			return;
		}
		if ( this._oldValue && this._value ) {
			if (this._value.h !== this._oldValue.h || this._value.s !== this._oldValue.s || this._value.v !== this._oldValue.v) {
				this.draw();
			}
			if (this._value.a !== this._oldValue.a) {
		console.log( "Alpha DO CHECK", this._value, this._oldValue );
				this.onColorSet();
				this.setMarkerColor();

			}
		}
		this._oldValue = {...this._value};
	}



}
