import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {color, object} from '@storybook/addon-knobs';

import {AngularColorPickerModule} from '../angular-color-picker.module';
import {hsv2hsl} from '../util';
import {IColorHSV} from '../angular-color-picker.types';
import {HueSlider} from '../sliders/hueSlider';
import {SpectrumCanvasComponent} from './gradientCanvas/spectrumCanvas/spectrumCanvas.component';
import {WheelCanvasComponent} from './gradientCanvas/wheelCanvas/wheelCanvas.component';

function hslString(value: IColorHSV): string {
	console.log(value);
	let hsl = hsv2hsl(value);
	return 'hsl(' + hsl.h + ',' + hsl.s + ',' + hsl.l + ')';
}

export var DEFAULT_COLOR: IColorHSV = {h: 150, s: 1, v: .5, a: .5};


storiesOf('Canvas|Hue Slider', module)
	.addDecorator(
		moduleMetadata({
			imports: [AngularColorPickerModule]
		})
	)
	.add('Default', () => ({
		component: HueSlider,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action('Color Change')
		}
	}))
	.add('Custom Width', () => ({
		component: HueSlider,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action('Color Change'),
			width: 32
		}
	}));

//storiesOf('Canvas|Alpha Slider', module)
//	.addDecorator(
//		moduleMetadata({
//			imports: [AngularColorPickerModule]
//		})
//	)
//	.add('Default', () => ({
//		component: AlphaCanvasComponent,
//		props: {
//			value: color('color', 'rgb(203, 247, 26)' ),
//			valueChange: action('Color Change')
//		}
//	}));

//storiesOf('Canvas|Lightness Slider', module)
//	.addDecorator(
//		moduleMetadata({
//			imports: [AngularColorPickerModule]
//		})
//	)
//	.add('Default', () => ({
//		component: LightnessCanvasComponent,
//		props: {
//			value: color('color', 'rgb(203, 247, 26)' ),
//			valueChange: action('Color Change')
//		}
//	}));

storiesOf('Canvas|Spectrum', module)
	.addDecorator(
		moduleMetadata({
			imports: [AngularColorPickerModule]
		})
	)
	.add('Default', () => ({
		component: SpectrumCanvasComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action('Color Change')
		}
	}));

storiesOf('Canvas|Wheel', module)
	.addDecorator(
		moduleMetadata({
			imports: [AngularColorPickerModule]
		})
	)
	.add('Default', () => ({
		component: WheelCanvasComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action('Color Change')
		}
	}));