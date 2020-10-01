import {NgModule} from '@angular/core';
import {MatColorPickerComponent} from './mat-color-picker.component';
import {GradientCanvas} from './canvas/gradientCanvas.component';
import {SpectrumCanvasComponent} from './canvas/spectrumCanvas.component';
import {AlphaCanvasComponent} from './canvas/alphaCanvas.component';
import {WheelCanvasComponent} from './canvas/wheelCanvas.component';
import {LightnessCanvasComponent} from './canvas/lightnessCanvas.component';
import {SliderCanvas} from './canvas/sliderCanvas.component';
import {HueSpectrumComponent} from './components/hue-spectrum/hue-spectrum.component';
import {ColorComponent} from './components/color/color.component';
import {CommonModule} from '@angular/common';
import {WheelLightnessComponent} from './components/wheel-lightness/wheel-lightness.component';
import {HueLightnessComponent} from './components/hue-lightness/hue-lightness.component';
import {HueLightnessCanvasComponent} from './canvas/hueLightnessCanvas.component';
import {ComponentSliderCanvasComponent} from './canvas/componentSliderCanvas.component';
import {SlidersComponent} from './components/sliders/sliders.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatColorPickerService} from './mat-color-picker.service';

import {TBMCPCanvas} from './mat-color-picker.types';
import {RgbSlider} from './canvases/sliders/rgbSlider';
import {HueSlider} from './canvases/sliders/hueSlider';
import {HsvSlider} from './canvases/sliders/hsvSlider';
import {HslSlider} from './canvases/sliders/hslSlider';
import {AlphaSlider} from './canvases/sliders/alphaSlider';


@NgModule({

	declarations: [
		MatColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		AlphaCanvasComponent,
		WheelCanvasComponent,
		LightnessCanvasComponent,
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
		MatColorPickerComponent,
		//GradientCanvas,
		//SliderCanvas,
		SpectrumCanvasComponent,
		AlphaCanvasComponent,
		WheelCanvasComponent,
		LightnessCanvasComponent,
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
export class MatColorPickerModule {
	constructor(private matColorPickerService: MatColorPickerService ) {
		matColorPickerService.registerCanvas( 'rgb', RgbSlider );
		matColorPickerService.registerCanvas( 'hue', HueSlider );
		matColorPickerService.registerCanvas( 'hsv', HsvSlider );
		matColorPickerService.registerCanvas( 'hsl', HslSlider  );
		matColorPickerService.registerCanvas( 'alpha', AlphaSlider  );
	}
}
