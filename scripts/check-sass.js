import * as sass from 'sass';

const SASS_ENTRY_POINT = 'src/scss/main.scss';

/**
 * Validates that the Sass entry point can be compiled without producing a production build.
 * @returns {void}
 */
function checkSass() {
    sass.compile(SASS_ENTRY_POINT, { style: 'expanded' });
}

checkSass();
