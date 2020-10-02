import {moduleMetadata, storiesOf} from '@storybook/angular';
import {AngularColorPickerModule} from '../../../angular-color-picker.module';
import {HueSpectrumComponent} from './hue-spectrum.component';
import {action} from '@storybook/addon-actions';
import {EOrientation} from '../../../angular-color-picker.types';
import { color, boolean, select } from '@storybook/addon-knobs';

storiesOf( 'Panels|Hue Spectrum', module)
	.addDecorator(
		moduleMetadata({
			imports: [AngularColorPickerModule]
		})
	)
	.add( 'Default', () => ({
		component: HueSpectrumComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', true ),
			sliderOrientation: select( 'sliderOrientation', [EOrientation.VERTICAL,EOrientation.HORIZONTAL], EOrientation.VERTICAL)
		}
	}))
	.add( 'Without Alpha', () => ({
		component: HueSpectrumComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', false )
		}
	}))
	.add( 'Horizontal Sliders', () => ({
		component: HueSpectrumComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', true ),
			sliderOrientation: select( 'sliderOrientation', [EOrientation.VERTICAL,EOrientation.HORIZONTAL], EOrientation.HORIZONTAL)
		}
	}))
