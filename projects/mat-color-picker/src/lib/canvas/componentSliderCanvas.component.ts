import {Component, DoCheck, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {color2rgb, hsv2hsl, hsv2rgb, rgb2hsv, hsl2hsv} from '../util' ;
import {SliderCanvas} from './sliderCanvas.component';
import {IColorHSV, TBMCPCanvas} from '../mat-color-picker.types';
import {MatColorPickerService} from '../mat-color-picker.service';


@Component({
	selector: 'tb-component-slider',
	templateUrl: './canvas.template.html',
	encapsulation: ViewEncapsulation.None
})
export class ComponentSliderCanvasComponent extends SliderCanvas implements OnInit, DoCheck {
	public type = 'component';

	@Input('component') component: string;
	@Input('colorModel') colorModel: string;

	private canvasInstance: TBMCPCanvas;

	constructor( private matColorPickerService: MatColorPickerService ) {
		super();

	}
	ngOnInit() {
		super.ngOnInit();
		//if ( ( this.colorModel === 'hsl' || this.colorModel == 'hsv' ) && this.component === 'h' ) {
		//	this.canvasInstance = this.matColorPickerService.getCanvas('hue', this.component);
		//} else {
			this.canvasInstance = this.matColorPickerService.getCanvas(this.colorModel, this.component);
		//}
	}

	ngDoCheck() {
		super.ngDoCheck();
		if (!this.ready) {
			return;
		}

		if ( this.canvasInstance.shouldDraw( this._value, this._oldValue ) ) {
			this.draw();
		}
		if ( this.canvasInstance.shouldSetColor( this._value, this._oldValue ) ) {
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

		this.canvasInstance.draw( this._value, xGradient, yGradient, start, end );

		this.context.fillStyle = xGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.context.fillStyle = yGradient;
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);

		this.canvas.nativeElement.classList.add('checkered');
		this.setMarkerColor();

		return;
		//
		//let color;
		//switch (this.colorModel) {
		//	case 'rgb':
		//		color = color2rgb(this.value);
		//		switch (this.component) {
		//			case 'r':
		//				hueGrd.addColorStop(start, 'rgba( 0, ' + color.g + ', ' + color.b + ', 1)');
		//				hueGrd.addColorStop(end, 'rgba( 255, ' + color.g + ', ' + color.b + ', 1)');
		//				break;
		//			case 'g':
		//				hueGrd.addColorStop(start, 'rgba(' + color.r + ', 0, ' + color.b + ', 1)');
		//				hueGrd.addColorStop(end, 'rgba(' + color.r + ', 255, ' + color.b + ', 1)');
		//				break;
		//			case 'b':
		//				hueGrd.addColorStop(start, 'rgba(' + color.r + ', ' + color.g + ', 0, 1)');
		//				hueGrd.addColorStop(end, 'rgba(' + color.r + ', ' + color.g + ', 255, 1)');
		//				break;
		//		}
		//		break;
		//	case 'hsv':
		//		color = this.value;
		//		switch( this.component ) {
		//			case 'h': // USE HUE CANVAS
		//				hueGrd = this.drawHueCanvas( hueGrd );
		//				break;
		//			case 's':
		//				hueGrd.addColorStop(start, 'hsla( ' + color.h + ', 0%, ' + color.v * 100 + '%, 1)');
		//				hueGrd.addColorStop(end, 'hsla( ' + color.h + ', 100%, ' + color.v * 50 + '%, 1)');
		//				break;
		//			case 'v':
		//				hueGrd.addColorStop(start, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 0%, 1)');
		//				hueGrd.addColorStop(end, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 50%, 1)');
		//				break;
		//		}
		//		break;
		//	case 'hsl':
		//		color = hsv2hsl(this.value as IColorHSV);
		//		switch( this.component ) {
		//			case 'h': // USE HUE CANVAS
		//				hueGrd = this.drawHueCanvas( hueGrd );
		//				break;
		//			case 's':
		//				hueGrd.addColorStop(start, 'hsla( ' + color.h + ', 0%, ' + color.l * 100 + '%, 1)');
		//				hueGrd.addColorStop(end, 'hsla( ' + color.h + ', 100%, ' + color.l * 100 + '%, 1)');
		//				break;
		//			case 'l':
		//				hueGrd.addColorStop(start, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 0%, 1)');
		//				hueGrd.addColorStop(0.5, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 50%, 1)');
		//				hueGrd.addColorStop(end, 'hsla( ' + color.h + ', ' + color.s * 100 + '%, 100%, 1)');
		//				break;
		//		}
		//		break;
		//}
		//
		////let hsl = hsv2hsl( { h: this.value.h, s: this.value.s, v: 1 } );
		//// Add colors
		//
		////hueGrd.addColorStop(0,	'hsla(' + this.value.h + ', ' + hsl.s * 100 + '%, ' + hsl.l * 100 + '%, 1)');
		////hueGrd.addColorStop(1,	'rgba(0,0,0,1)');
		//
		//
		//// Fill with gradient
		//this.context.fillStyle = hueGrd;
		//this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.height);
		//
		//this.canvas.nativeElement.classList.add('checkered');
		//this.setMarkerColor();
	}



	getColorByPoint(x, y) {
		let sliderVal
		let percent = this.getPercentage(x, y);
		this._value = this.canvasInstance.getColorByPercent( this._value, this.invert ? 1 - percent : percent, 0 );
		if ( typeof this.canvasInstance.setMarkerColor === 'function' ) {
			this.canvasInstance.setMarkerColor( this._value, this.marker.nativeElement );
		}
		this.valueChange.emit( this._value );

		//switch (this.colorModel) {
		//	case 'rgb':
		//		let rgba = hsv2rgb(this._value as IColorHSV);
		//		sliderVal = this.invert ? 255 - ( 255 * percent ) : 255 * percent;
		//		switch (this.component) {
		//			case 'r':
		//				this._value = rgb2hsv({...rgba, r: sliderVal}) as IColorHSV;
		//				break;
		//			case 'g':
		//				this._value = rgb2hsv({...rgba, g: sliderVal}) as IColorHSV;
		//				break;
		//			case 'b':
		//				this._value = rgb2hsv({...rgba, b: sliderVal}) as IColorHSV;
		//				break;
		//		}
		//		break;
		//	case 'hsv':
		//		switch (this.component) {
		//			case 'h':
		//				sliderVal = 360 * percent;
		//				break;
		//			case 's':
		//			case 'v':
		//				sliderVal = this.invert ? 1 - percent : percent;
		//				break;
		//		}
		//		this._value[this.component] = sliderVal;
		//
		//		break;
		//	case 'hsl':
		//		let hsl = hsv2hsl(this._value as IColorHSV);
		//		sliderVal = this.invert ? 1 - percent : percent;
		//		switch (this.component) {
		//			case 'h':
		//				this._value = hsl2hsv({...hsl, h: 360 * percent}) as IColorHSV;
		//				break;
		//			case 's':
		//				this._value = hsl2hsv({...hsl, s: sliderVal}) as IColorHSV;
		//				break;
		//			case 'l':
		//				this._value = hsl2hsv({...hsl, l: sliderVal}) as IColorHSV;
		//				break;
		//		}
		//		break;
		//}
		//
		//console.log( 'set', this._value );


		//this.setMarkerColor();
	}

	onColorSet() {
		//console.log('alpha onColorSet', this.$scope.data.color);
		//this.draw();

		let dim = this.getSliderDimension();

		let pos = this.canvasInstance.setColor( this._value );
		if ( typeof this.canvasInstance.setMarkerColor === 'function' ) {
			this.canvasInstance.setMarkerColor( this._value, this.marker.nativeElement );
		}
		if ( this.invert ) {
			this.setMarkerCenter(dim * (1 - pos));
		} else {
			this.setMarkerCenter(dim * pos);
		}


		//let color;
		//let pos;
		//switch (this.colorModel) {
		//	case 'rgb':
		//		color = hsv2rgb(this._value as IColorHSV);
		//		pos = (color[this.component] / 255);
		//		break;
		//	case 'hsv':
		//		color = this._value;
		//		if ( this.component == 'h' ) {
		//			pos = color.h / 360;
		//		} else {
		//			pos = color[this.component];
		//		}
		//		break;
		//	case 'hsl':
		//		color = hsv2hsl( this.value as IColorHSV );
		//		if ( this.component === 'h' ) {
		//			pos = color.h / 360;
		//		} else {
		//			pos = color[this.component];
		//		}
		//		break;
		//}
		//
		//if ( this.invert && this.component !== 'h' ) {
		//	this.setMarkerCenter(dim * (1 - pos));
		//} else {
		//	this.setMarkerCenter(dim * pos);
		//}
	}
}
