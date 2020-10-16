import {NgModule} from '@angular/core';
import {AlphaSliderComponent} from './alpha/alphaSlider.component';
import {HueSliderComponent} from './hue/hueSlider.component';
import {SaturationSliderComponent} from './SVLSlider/saturation/saturationSlider.component';
import {LightnessSliderComponent} from './SVLSlider/lightness/lightnessSlider.component';
import {ValueSliderComponent} from './SVLSlider/value/valueSlider.component';
import {RedSliderComponent} from './RGBSlider/Red/redSlider.component';
import {GreenSliderComponent} from './RGBSlider/Green/greenSlider.component';
import {BlueSliderComponent} from './RGBSlider/Blue/blueSlider.component';
import {CommonModule} from '@angular/common';

@NgModule({

	declarations: [
		AlphaSliderComponent,
		HueSliderComponent,
		SaturationSliderComponent,
		LightnessSliderComponent,
		ValueSliderComponent,
		RedSliderComponent,
		GreenSliderComponent,
		BlueSliderComponent
		//CyanSliderComponent,
		//MagentaSliderComonent,
		//YellowSliderComponent,
		//BlackSliderComponent
	],
	imports: [CommonModule],
	providers: [],
	exports: [
		AlphaSliderComponent,
		HueSliderComponent,
		SaturationSliderComponent,
		LightnessSliderComponent,
		ValueSliderComponent,
		RedSliderComponent,
		GreenSliderComponent,
		BlueSliderComponent
	]
})
export class AngularColorPickerSlidersModule {
	constructor() {}
}

