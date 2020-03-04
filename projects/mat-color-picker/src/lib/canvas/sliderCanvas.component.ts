import { Component, DoCheck, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation, Directive } from '@angular/core';
import {GradientCanvas} from './gradientCanvas.component';
import {EOrientation} from '../mat-color-picker.types';


//@Component({
//	selector: 'tb-slider-canvas',
//	templateUrl: './canvas.template.html',
//	encapsulation: ViewEncapsulation.None
//})
@Directive()
export class SliderCanvas extends GradientCanvas implements OnInit, OnChanges {
	public type = 'hue';
	@Input()
	protected width = 12;
	@Input()
	protected height = 255;
	@Input()
	protected orientation: EOrientation = EOrientation.VERTICAL
	@Input()
	public markerClass = 'circle-filled';

	@HostBinding('class.tb-color-slider') slider = true;
	@HostBinding('class.tb-horizontal') horizontal = false;
	@HostBinding('class.tb-vertical') vertical = false;

	ngOnInit() {
		super.ngOnInit();
		this.checkOrientation( this.orientation );
	}

	ngOnChanges( changes ) {
		if ( changes.orientation && changes.orientation.previousValue ) {
			this.checkOrientation( changes.orientation.currentValue );
			this.setDimensions();
			this.draw();
			this.onColorSet();
		}
	}
	checkOrientation( val ) {
		let isHorizontal = val === EOrientation.HORIZONTAL;

		this.ignoreX = !isHorizontal;
		this.vertical = !isHorizontal;

		this.horizontal = isHorizontal;
		this.ignoreY = isHorizontal;

		if ( isHorizontal ) {
			if (this.height > this.width) {
				let tmp = this.height;
				this.height = this.width;
				this.width = tmp;
			}
		} else {
			if (this.height < this.width) {
				let tmp = this.height;
				this.height = this.width;
				this.width = tmp;
			}
		}
	}

	getSliderDimension() {
		return this.isVertical() ? this.height : this.width;
	}

	getPercentage( x, y ) {
		let coord = this.isVertical() ? y : x;
		return (coord / this.getSliderDimension());
	}

	isVertical() {
		return this.orientation === EOrientation.VERTICAL;
	}
}
