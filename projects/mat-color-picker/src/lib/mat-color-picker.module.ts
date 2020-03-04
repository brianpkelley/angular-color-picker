import {NgModule} from '@angular/core';
import {MatColorPickerComponent} from './mat-color-picker.component';
import {GradientCanvas} from './canvas/gradientCanvas.component';
import {SpectrumCanvasComponent} from './canvas/spectrumCanvas.component';
import {HueCanvasComponent} from './canvas/hueCanvas.component';
import {AlphaCanvasComponent} from './canvas/alphaCanvas.component';
import {WheelCanvasComponent} from './canvas/wheelCanvas.component';
import {LightnessCanvasComponent} from './canvas/lightnessCanvas.component';
import {SliderCanvas} from './canvas/sliderCanvas.component';
import {HueSpectrumComponent} from './components/hue-spectrum/hue-spectrum.component';
import {ColorComponent} from './components/color/color.component';
import {CommonModule} from '@angular/common';
import {WheelLightnessComponent} from './components/wheel-lightness/wheel-lightness.component';


@NgModule({
	declarations: [
		MatColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		HueCanvasComponent,
		AlphaCanvasComponent,
		WheelCanvasComponent,
		LightnessCanvasComponent,
		HueSpectrumComponent,
		ColorComponent,
		HueSpectrumComponent,
		WheelLightnessComponent
	],
	imports: [CommonModule],
	exports: [
		MatColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		HueCanvasComponent,
		AlphaCanvasComponent,
		WheelCanvasComponent,
		LightnessCanvasComponent,
		HueSpectrumComponent,
		ColorComponent,
		HueSpectrumComponent,
		WheelLightnessComponent
	]
})
export class MatColorPickerModule {
}
