import '../scss/main.scss';

import { initTheme } from './theme';
import { initUi } from './ui';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUi();
});
