import { addDecorator, configure } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs'
addDecorator( withKnobs );

// automatically import all files ending in *.stories.ts
configure(require.context('../projects', true, /\.stories\.ts$/), module);

