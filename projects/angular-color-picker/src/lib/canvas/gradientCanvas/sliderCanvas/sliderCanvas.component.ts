import { DoCheck, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import {GradientCanvas} from '../gradientCanvas.component';
import {EOrientation} from '../../../angular-color-picker.types';



export abstract class SliderCanvas extends GradientCanvas implements OnInit, OnChanges, DoCheck {
	public type = 'hue';
	@Input()
	public markerClass = 'circle-filled';
	@HostBinding('class.tb-color-slider') slider = true;
	@HostBinding('class.tb-horizontal') horizontal = false;
	@HostBinding('class.tb-vertical') vertical = false;
	@Input()
	protected width = 12;
	@Input()
	protected height = 255;
	@Input()
	protected orientation: EOrientation = EOrientation.VERTICAL;
	@Input('invert')
	protected invert: boolean;

	ngOnInit() {
		super.ngOnInit();
		this.checkOrientation(this.orientation);
	}

	ngOnChanges(changes) {
		if (changes.orientation && changes.orientation.previousValue) {
			this.checkOrientation(changes.orientation.currentValue);
			this.setDimensions();
			this.draw();
			this.onColorSet();
		}
	}

	ngDoCheck() {
		super.ngDoCheck();
		if (!this.ready) {
			return;
		}

		if (this.shouldDraw()) {
			this.draw();
		}
		if (this.shouldSetColor()) {
			this.onColorSet();
		}

		this._oldValue = this._value.toHSV();
	}

	abstract shouldDraw();

	abstract shouldSetColor();


	checkOrientation(val) {
		let isHorizontal = val === EOrientation.HORIZONTAL;

		this.ignoreX = !isHorizontal;
		this.vertical = !isHorizontal;

		this.horizontal = isHorizontal;
		this.ignoreY = isHorizontal;

		if (isHorizontal) {
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

	draw() {
		this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

		// Create gradient
		var xGradient;
		var yGradient;
		if (this.isVertical()) {
			xGradient = this.context.createLinearGradient(90, 0, 90, this.height);
			yGradient = this.context.createLinearGradient(0, 90, this.width, 90);
		} else {
			xGradient = this.context.createLinearGradient(0, 90, this.width, 90);
			yGradient = this.context.createLinearGradient(90, 0, 90, this.height);
		}
		// Add colors
		let start = this.invert ? 1 : 0;
		let end = this.invert ? 0 : 1;

		this.fill(xGradient, yGradient, start, end);

		this.context.fillStyle = xGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.context.fillStyle = yGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.canvas.nativeElement.classList.add('checkered');
		this.setMarkerColor();

		return;
	}

	abstract fill(xGradient: CanvasGradient, yGradient: CanvasGradient, start, end)

	getSliderDimension() {
		return this.isVertical() ? this.height : this.width;
	}

	getPercentage(x, y) {
		let coord = this.isVertical() ? y : x;
		return Math.min(1, Math.max(0, (coord / this.getSliderDimension())));
	}

	isVertical() {
		return this.orientation === EOrientation.VERTICAL;
	}


	getColorByPoint(x, y) {
		let percent = this.getPercentage(x, y);

		this._value.color = this.getColorByPercent(this.invert ? 1 - percent : percent);
		if (typeof this.setMarkerColor === 'function') {
			this.setMarkerColor();
		}
		this.valueChange.emit(this._value.toHSV());
	}

	onColorSet() {
		let dim = this.getSliderDimension();

		let pos = this.setColor();
		if (typeof this.setMarkerColor === 'function') {
			this.setMarkerColor();
		}
		if (this.invert) {
			this.setMarkerCenter(dim * (1 - pos));
		} else {
			this.setMarkerCenter(dim * pos);
		}
	}

	abstract getColorByPercent(percent);

	abstract setColor();
}
