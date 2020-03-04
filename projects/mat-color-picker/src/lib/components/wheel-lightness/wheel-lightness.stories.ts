import {action} from '@storybook/addon-actions';
import {WheelLightnessComponent} from './wheel-lightness.component';
import {MatColorPickerModule} from '../../mat-color-picker.module';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {EOrientation} from '../../mat-color-picker.types';
import { color, select, boolean } from '@storybook/addon-knobs';

storiesOf( 'Panels|Wheel Lightness', module)
	.addDecorator(
		moduleMetadata({
			imports: [MatColorPickerModule]
		})
	)
	.add( 'Default', () => ({
		component: WheelLightnessComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', true ),
			sliderOrientation: select( 'sliderOrientation', [EOrientation.VERTICAL,EOrientation.HORIZONTAL], EOrientation.VERTICAL)
		}
	}))
	.add( 'Without Alpha', () => ({
		component: WheelLightnessComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', false ),
			sliderOrientation: select( 'sliderOrientation', [EOrientation.VERTICAL,EOrientation.HORIZONTAL], EOrientation.VERTICAL)
		}
	}))
	.add( 'Horizontal Sliders', () => ({
		component: WheelLightnessComponent,
		props: {
			value: color('color', 'rgb(203, 247, 26)' ),
			valueChange: action( 'Color Change' ),
			showAlpha: boolean( 'showAlpha', true ),
			sliderOrientation: select( 'sliderOrientation', [EOrientation.VERTICAL,EOrientation.HORIZONTAL], EOrientation.HORIZONTAL)
		}
	}))
