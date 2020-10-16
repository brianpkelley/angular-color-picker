import {AfterViewInit, DoCheck, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IColor, IColorHSV, ICoord} from '../../angular-color-picker.types';
import {TBColor} from '../../services/color';
import {limit} from '../../util';

//@Component({
//	selector: 'tb-gradient-canvas',
//	templateUrl: './canvas.template.html',
//	encapsulation: ViewEncapsulation.None
//})
//@Directive()
export class GradientCanvas implements OnInit, AfterViewInit, DoCheck {
	static CANVAS_ID = 0;
	@Input()
	public markerClass = 'circle-filled';
	public type: string = 'gCanvas';
	@HostBinding('id')
	public id: string = this.type + '_' + (++GradientCanvas.CANVAS_ID) + '_' + Date.now();
	@HostBinding('class.tb-canvas-container')
	canvasContainer = true;
	@HostBinding('class.tb-canvas-ignore-x')
	public ignoreX = false;
	@HostBinding('class.tb-canvas-ignore-y')
	public ignoreY = false;
	@HostBinding('style.cursor') public cursor: string = 'crosshair';
	public trackingMove: Boolean = false;
	public hasAlpha: Boolean = true;
	// Colors values are 0-255, thus we need the height to be 255.
	@Input('height')
	protected height = 255;
	@Input('width')
	protected width = 255;
	protected _oldValue: IColorHSV;
	@Output('valueChange') protected valueChange: EventEmitter<IColorHSV> = new EventEmitter<IColorHSV>();
	@ViewChild('canvas', {static: true}) protected canvas: ElementRef;
	@ViewChild('marker', {static: true}) protected marker: ElementRef;
	protected context: CanvasRenderingContext2D;
	protected offset: ICoord = {x: 0, y: 0};
	protected ready = false;

	constructor() {
		this._value = new TBColor({
			h: 0,
			s: 1,
			v: 0.5,
			a: 1
		});
	}

	protected _value: TBColor;

	protected get value() {
		return this._value.toHSV();
	}

	@Input('value')
	protected set value(val: IColor) {
		this._value.color = val;
	}

	ngOnInit() {
		this.id = this.type + '_' + (++GradientCanvas.CANVAS_ID) + '_' + Date.now();
		this.context = this.canvas.nativeElement.getContext('2d');
	}

	ngAfterViewInit() {
		// The canvas, the context, and the marker.
		this.setDimensions();
		this.draw();

		setTimeout(() => this.ready = true, 50);
	}

	ngDoCheck() {
		if (!this.ready) {
			return;
		}
		//if (!this._oldValue && this._value) {
		//	this.onColorSet();
		//}
	}

	setDimensions() {
		// Set the dimensions
		this.canvas.nativeElement.height = this.height;
		this.canvas.nativeElement.width = this.width;
	}


	/**
	 * draw - Overwrite this in sub class.  Will fill with a "troublesome pink"
	 */
	draw() {
		this.context.fillStyle = '#ff00ff';
		this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
	};


	/**
	 * GradientCanvas.prototype.getColorByMouse - Returns the color under the mouse.
	 */
	getMouseCoordinates(e): ICoord {

		let te = e.touches && e.touches[0];

		let pageX = te && te.clientX || e.clientX;
		let pageY = te && te.clientY || e.clientY;

		// console.log( e, pageX, this.offset.x );
		let x = Math.round(pageX - this.offset.x);
		let y = Math.round(pageY - this.offset.y);

		return this.adjustXY(x, y);
	};


	@HostListener('mousedown', ['$event'])
	@HostListener('touchstart', ['$event'])
	onMouseDown(e) {
		// Prevent highlighting
		e.preventDefault();
		e.stopImmediatePropagation();

		this.cursor = 'none';
		this.trackingMove = true;

		let canvasOffset = this.canvas.nativeElement.getBoundingClientRect();
		this.offset.x = canvasOffset.left;
		this.offset.y = canvasOffset.top;

		// Set the color on click ( mouse down )
		//this.onMouseMove(e);
		setTimeout(() => this.onMouseMove(e), 0);
	};

	@HostListener('document:mouseup', ['$event'])
	@HostListener('document:mouseleave', ['$event'])
	@HostListener('document:touchend', ['$event'])
	onMouseUp(e) {
		console.log( 'MOUSE UP', this.trackingMove )
		if (!this.trackingMove) {
			return;
		}
		this.trackingMove = false;
		this.cursor = 'crosshair';

		let coords = this.getMouseCoordinates(e);
		//this.setMarkerCenter( coords.x, coords.y )
		setTimeout(() => this.setMarkerCenter(coords.x, coords.y), 0);
	}

	@HostListener('document:mousemove', ['$event'])
	@HostListener('document:touchmove', ['$event'])
	//@limit(5)
	onMouseMove(e) {
		if (!this.trackingMove) {
			return;
		}
		let coords = this.getMouseCoordinates(e);

		this.getColorByPoint(coords.x, coords.y);
		this.setMarkerCenter(coords.x, coords.y);
	};

	setMarkerCenter(x, y?) {

		let xOffset = -1 * this.marker.nativeElement.offsetWidth / 2;
		let yOffset = -1 * this.marker.nativeElement.offsetHeight / 2;
		let xAdjusted, xFinal, yAdjusted, yFinal;

		//console.log( '----');
		//console.log( x, y );


		if (this.ignoreX) {
			y = y === undefined ? x : y;
			x = this.width / 2;
		} else if (this.ignoreY) {
			y = this.height / 2;
		}

		xAdjusted = x + xOffset;
		yAdjusted = y + yOffset;

		if (this.ignoreX) {
			xFinal = xAdjusted;
			yFinal = Math.round(Math.max(Math.min(this.height + yOffset, yAdjusted), yOffset));
		} else if (this.ignoreY) {
			xFinal = Math.floor(Math.max(Math.min(this.width + xOffset, xAdjusted), xOffset));
			yFinal = yAdjusted;
		} else {
			xFinal = Math.floor(Math.max(Math.min(this.width + xOffset, xAdjusted), xOffset));
			yFinal = Math.floor(Math.max(Math.min(this.height + yOffset, yAdjusted), yOffset));
		}

		//console.log( xFinal, yFinal );
		this.marker.nativeElement.style.left = xFinal + 'px';
		this.marker.nativeElement.style.top = yFinal + 'px';
	};

	getMarkerCenter() {
		let returnObj = {
			x: this.marker.nativeElement.offsetLeft + (Math.floor(this.marker.nativeElement.offsetWidth / 2)),
			y: this.marker.nativeElement.offsetTop + (Math.floor(this.marker.nativeElement.offsetHeight / 2))
		};
		return returnObj;
	};

	onColorSet() {

	}

	getColorByPoint(x: number, y: number): IColorHSV | void {
		// Stub
	};

	adjustXY(x, y) {
		x = Math.max(0, Math.min(x, this.canvas.nativeElement.width));
		y = Math.max(0, Math.min(y, this.canvas.nativeElement.height));

		return {x: x, y: y};
	};

	setMarkerColor() {
		let rgb = this._value.toRGB();
		//console.log( this._value.toHSV(), rgb );
		this.marker.nativeElement.style.borderColor = this._value.getBrightness() > 135 ? '#000' : '#fff';
		this.marker.nativeElement.style.setProperty('--color', 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')');
	}

};
