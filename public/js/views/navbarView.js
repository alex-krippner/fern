/* eslint-disable node/no-unsupported-features/es-syntax */
import { elements } from './base.js';

/*
******************************
NAVBAR TRANSFORMATION
******************************
*/

export const sectionLandingOptions = {
  rootMargin: '-100px 0px 0px 0px',
};
export const sectionLandingObserver = new IntersectionObserver(function (
  entries
  // sectionLandingObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      elements.nav.classList.add('navigation__scrolled');
      elements.linkNav.forEach((link) =>
        link.classList.add('navigation__link--scrolled')
      );
      elements.navTitle.classList.add('navigation__title--scrolled');
    } else {
      elements.nav.classList.remove('navigation__scrolled');
      elements.linkNav.forEach((link) =>
        link.classList.remove('navigation__link--scrolled')
      );
      elements.navTitle.classList.remove('navigation__title--scrolled');
    }
  });
}, sectionLandingOptions);

export const hamburgerObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      elements.hamburger.forEach((bar) => {
        bar.classList.add('btn__toggle--bar-scrolled');
      });
    } else {
      elements.hamburger.forEach((bar) => {
        bar.classList.remove('btn__toggle--bar-scrolled');
      });
    }
  });
});
