/* eslint-disable no-undef */
import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import executeCarousel from './views/carouselView.js';

/**
 *********************
 * NAV TRANSITIONS
 *********************
 */

if (document.documentElement.clientWidth > 600) {
  navbarViews.sectionLandingObserver.observe(elements.sectionLanding);
}

navbarViews.hamburgerObserver.observe(elements.sectionLanding);

/*
 *************
 * CAROUSEL
 *************
 */

if (elements.carouselMain) {
  console.log('found carousel');
  executeCarousel();
}

/*
 *************
 * HAMBURGER
 *************
 */

const toggleButton = document.querySelector('.btn__toggle');
const hamburgerBar = document.querySelectorAll('.btn__toggle--bar');
const navBar = document.querySelector('.navigation');
const navList = document.querySelector('.navigation__list');
const navLogo = document.querySelector('.navigation__logo-box');
const navLinks = document.querySelectorAll('.navigation__link');

toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('navigation--active');
  navList.classList.toggle('navigation__list--active');
  navLogo.classList.toggle('navigation__logo-box--active');

  navLinks.forEach((link) => {
    link.classList.toggle('navigation__link--active');
  });

  hamburgerBar.forEach((bar) => {
    bar.classList.toggle('btn__toggle--bar-active');
  });
});
