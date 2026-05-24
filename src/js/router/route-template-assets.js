import homeArrowUrl from '../../resources/images/decoratives/home_arrow.svg';
import bookStackUrl from '../../resources/images/decoratives/book_stack.webp';
import plantSproutUrl from '../../resources/images/decoratives/plant_sprout.webp';
import puzzleUrl from '../../resources/images/decoratives/puzzle.webp';
import mohamadPortraitUrl from '../../resources/images/home/mohamad_portrait.webp';

const routeAssetUrlMap = {
    '/src/resources/images/decoratives/book_stack.webp': bookStackUrl,
    '/src/resources/images/decoratives/home_arrow.svg': homeArrowUrl,
    '/src/resources/images/decoratives/plant_sprout.webp': plantSproutUrl,
    '/src/resources/images/decoratives/puzzle.webp': puzzleUrl,
    '/src/resources/images/home/mohamad_portrait.webp': mohamadPortraitUrl,
};

/**
 * Replaces raw route-template asset paths with Vite-managed asset URLs.
 * @param {string} template
 * @returns {string}
 */
export function resolveRouteTemplateAssets(template) {
    return Object.entries(routeAssetUrlMap).reduce(
        (resolvedTemplate, [rawAssetPath, builtAssetUrl]) => resolvedTemplate.replaceAll(rawAssetPath, builtAssetUrl),
        template,
    );
}
