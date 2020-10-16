import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AngularColorPickerComponent} from './angular-color-picker.component';
import {SpectrumCanvasComponent} from './canvas/gradientCanvas/spectrumCanvas/spectrumCanvas.component';
import {WheelCanvasComponent} from './canvas/gradientCanvas/wheelCanvas/wheelCanvas.component';
import {HueSpectrumComponent} from './components/color/hue-spectrum/hue-spectrum.component';
import {HueLightnessCanvasComponent} from './canvas/gradientCanvas/hueLightnessCanvas/hueLightnessCanvas.component';
import {GradientCanvas} from './canvas/gradientCanvas/gradientCanvas.component';
import {HueLightnessComponent} from './components/color/hue-lightness/hue-lightness.component';
import {WheelValueComponent} from './components/color/wheel-value/wheel-value.component';
import {AngularColorPickerSlidersModule} from './canvas/gradientCanvas/sliderCanvas/sliders.module';


@NgModule({

	declarations: [
		AngularColorPickerComponent,
		SpectrumCanvasComponent,
		WheelCanvasComponent,
		HueLightnessCanvasComponent,
		//ColorComponent,

		HueSpectrumComponent,
		HueLightnessComponent,
		WheelValueComponent


	],
	imports: [CommonModule, AngularColorPickerSlidersModule],
	providers: [
		GradientCanvas
		//SliderCanvas
	],
	exports: [
		AngularColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		WheelCanvasComponent,
		HueLightnessCanvasComponent,

		HueSpectrumComponent,
		HueLightnessComponent,
		WheelValueComponent

	]
})
export class AngularColorPickerModule {
	constructor() {
	}
}

