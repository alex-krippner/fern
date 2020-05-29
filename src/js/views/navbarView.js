import { elements } from "./base.js";

/*
******************************
NAVBAR TRANSFORMATION
******************************
*/

export const sectionLandingOptions = {
  rootMargin: "-100px 0px 0px 0px",
};
export const sectionLandingObserver = new IntersectionObserver(function (
  entries,
  sectionLandingObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      elements.nav.classList.add("navigation__scrolled");
      elements.linkNav.forEach((link) =>
        link.classList.add("link__navigation--scrolled")
      );
    } else {
      elements.nav.classList.remove("navigation__scrolled");
      elements.linkNav.forEach((link) =>
        link.classList.remove("link__navigation--scrolled")
      );
    }
  });
},
sectionLandingOptions);
