import {NgModule} from '@angular/core';
import {AngularColorPickerComponent} from './angular-color-picker.component';
import {SpectrumCanvasComponent} from './canvas/gradientCanvas/spectrumCanvas/spectrumCanvas.component';
import {WheelCanvasComponent} from './canvas/gradientCanvas/wheelCanvas/wheelCanvas.component';
import {HueSpectrumComponent} from './components/color/hue-spectrum/hue-spectrum.component';
import {ColorComponent} from './components/color/color.component';
import {CommonModule} from '@angular/common';
import {WheelLightnessComponent} from './components/color/wheel-lightness/wheel-lightness.component';
import {HueLightnessComponent} from './components/color/hue-lightness/hue-lightness.component';
import {HueLightnessCanvasComponent} from './canvas/gradientCanvas/hueLightnessCanvas/hueLightnessCanvas.component';
import {ComponentSliderCanvasComponent} from './canvas/sliderCanvas/componentSliderCanvas/componentSliderCanvas.component';
import {SlidersComponent} from './components/color/sliders/sliders.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AngularColorPickerService} from './angular-color-picker.service';
import {RgbSlider} from './sliders/rgbSlider';
import {HueSlider} from './sliders/hueSlider';
import {HsvSlider} from './sliders/hsvSlider';
import {HslSlider} from './sliders/hslSlider';
import {AlphaSlider} from './sliders/alphaSlider';


@NgModule({

	declarations: [
		AngularColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		WheelCanvasComponent,
		HueLightnessCanvasComponent,
		ComponentSliderCanvasComponent,
		HueSpectrumComponent,
		ColorComponent,
		HueSpectrumComponent,
		HueLightnessComponent,
		WheelLightnessComponent,
		SlidersComponent
	],
	imports: [CommonModule, MatFormFieldModule, MatInputModule],
	exports: [
		AngularColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		WheelCanvasComponent,
		HueLightnessCanvasComponent,
		ComponentSliderCanvasComponent,
		HueSpectrumComponent,
		ColorComponent,
		HueSpectrumComponent,
		HueLightnessComponent,
		WheelLightnessComponent,
		SlidersComponent
	]
})
export class AngularColorPickerModule {
	constructor(private matColorPickerService: AngularColorPickerService) {
		matColorPickerService.registerSlider('rgb', RgbSlider);
		matColorPickerService.registerSlider('hue', HueSlider);
		matColorPickerService.registerSlider('hsv', HsvSlider);
		matColorPickerService.registerSlider('hsl', HslSlider);
		matColorPickerService.registerSlider('alpha', AlphaSlider);
	}
}
