import {Component, DoCheck, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SliderCanvas} from '../sliderCanvas.component';
import {AngularColorPickerService} from '../../../angular-color-picker.service';
import {Slider} from '../../../sliders/slider';


@Component({
	selector: 'tb-component-slider',
	templateUrl: '../../canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class ComponentSliderCanvasComponent extends SliderCanvas implements OnInit, DoCheck {
	public type = 'component';

	@Input('component') component: string;
	@Input('colorModel') colorModel: string;

	private canvasInstance: Slider;

	constructor(private matColorPickerService: AngularColorPickerService) {
		super();

	}

	ngOnInit() {
		super.ngOnInit();
		this.canvasInstance = this.matColorPickerService.getSlider(this.colorModel, this.component);
	}

	ngDoCheck() {
		super.ngDoCheck();
		if (!this.ready) {
			return;
		}

		if (this.canvasInstance.shouldDraw(this._value, this._oldValue)) {
			this.draw();
		}
		if (this.canvasInstance.shouldSetColor(this._value, this._oldValue)) {
			this.onColorSet();
		}

		this._oldValue = this._value;
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

		this.canvasInstance.draw(this._value, xGradient, yGradient, start, end);

		this.context.fillStyle = xGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.context.fillStyle = yGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.canvas.nativeElement.classList.add('checkered');
		this.setMarkerColor();

		return;
	}


	getColorByPoint(x, y) {
		let sliderVal;
		let percent = this.getPercentage(x, y);
		this._value = this.canvasInstance.getColorByPercent(this._value, this.invert ? 1 - percent : percent, 0);
		if (typeof this.canvasInstance.setMarkerColor === 'function') {
			this.canvasInstance.setMarkerColor(this._value, this.marker.nativeElement);
		}
		this.valueChange.emit(this._value);
	}

	onColorSet() {
		let dim = this.getSliderDimension();

		let pos = this.canvasInstance.setColor(this._value);
		if (typeof this.canvasInstance.setMarkerColor === 'function') {
			this.canvasInstance.setMarkerColor(this._value, this.marker.nativeElement);
		}
		if (this.invert) {
			this.setMarkerCenter(dim * (1 - pos));
		} else {
			this.setMarkerCenter(dim * pos);
		}
	}
}
