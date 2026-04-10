export function initBrandHover() {
    const hoverElements = document.querySelectorAll('.brand-hover');

    function handleMouseEnter() {
        hoverElements.forEach((element) => {
            element.style.opacity = '0.8';
        });
    }

    function handleMouseLeave() {
        hoverElements.forEach((element) => {
            element.style.opacity = '';
        });
    }

    hoverElements.forEach((element) => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
    });
}
