/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartView from './views/cartView.js';
import * as checkoutView from './views/checkoutView.js';
import executeCarousel from './views/carouselView.js';

import Cart from './models/Cart.js';
import Checkout from './models/Checkout.js';

// import { doc } from 'prettier';

const state = {};

/**
 *********************
 * NAV TRANSITIONS
 *********************
 */

if (window.location.pathname !== '/checkout') {
  if (document.documentElement.clientWidth > 600) {
    navbarViews.sectionLandingObserver.observe(elements.sectionLanding);
  }
  navbarViews.hamburgerObserver.observe(elements.sectionLanding);

  if (window.location.pathname === '/shop') {
    navbarViews.cartBtnContainerObserver.observe(elements.sectionLanding);

    navbarViews.cartContainerObserver.observe(elements.sectionLanding);
  }
}

/*
 *************
 * CAROUSEL
 *************
 */

if (elements.carouselMain) {
  executeCarousel();
}

/*
 *************
 * HAMBURGER
 *************
 */

if (window.location.pathname !== '/checkout') {
  elements.toggleButton.addEventListener('click', () => {
    elements.navBar.classList.toggle('navigation--active');
    elements.navList.classList.toggle('navigation__list--active');
    elements.navLogo.classList.toggle('navigation__logo-box--active');

    elements.navLinks.forEach((link) => {
      link.classList.toggle('navigation__link--active');
    });

    elements.hamburgerBar.forEach((bar) => {
      bar.classList.toggle('btn__toggle--bar-active');
    });
  });
}
/*
 ***************************
 * Shopping Cart
 ***************************
 */

// SHOPPING CART CONTROLLER

const controlCart = async () => {
  state.cart = new Cart();
  const sessionCart = await state.cart.getCart();
  if (sessionCart) {
    state.cart = new Cart(
      sessionCart.totalQty,
      sessionCart.totalPrice,
      sessionCart.products
    );
  }

  if (state.cart && state.cart.totalQty) {
    cartView.renderCartBtn();
    cartView.disableCartBtn(state.cart);
    cartView.updateBtnCartItemsCounter(state.cart);
    await cartView.fillCart(state.cart);
    cartView.setupQuantitySelectListener(state.cart);
    cartView.setupRemoveListener(state.cart);
  }

  // 'ADD TO CART' BUTTON EVENT LISTENER

  elements.cartBtn.forEach((button) => {
    button.addEventListener('click', async (e) => {
      await state.cart.addToCart(Object.values(e.target.dataset)[0]);

      await cartView.fillCart(state.cart);
      // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
      cartView.disableCartBtn(state.cart);

      cartView.updateBtnCartItemsCounter(state.cart);
      cartView.renderCartBtn();
      cartView.setupQuantitySelectListener(state.cart);
      cartView.setupRemoveListener(state.cart);
    });
  });

  // OPEN CART CONTAINER EVENT LISTENER
  elements.btnCart.addEventListener('click', () => {
    cartView.renderCart();
  });

  // CLOSE CART CONTAINER EVENT LISTENER

  elements.cartCloseBtn.addEventListener('click', () => {
    cartView.closeCart();
  });

  // 'CHECKOUT' BUTTON EVENT LISTENER

  // listen for checkout button
  elements.btnCheckout.addEventListener('click', () => {
    state.cart.checkout();
  });
};

// CART CONTROLLER TRIGGER

if (window.location.pathname === '/shop')
  window.addEventListener('DOMContentLoaded', controlCart());

/*
 ***************************
 * Checkout
 ***************************
 */

// CHECKOUT CONTROLLER

const controlCheckout = async () => {
  const stripe = Stripe(
    'pk_test_51H74ejCIYBumLJhusAkwZ5S1IHhm5UP13kqt5onNeOpzLPfQSspqXT3bppBF3HgPOiAXS8DTrFz92YFtlYSi52mf00mGO0JEMC'
  );

  state.cart = new Cart();
  const sessionCart = await state.cart.getCart();
  if (sessionCart) {
    state.cart = new Cart(
      sessionCart.totalQty,
      sessionCart.totalPrice,
      sessionCart.products
    );
  }

  state.checkout = new Checkout();

  if (state.cart.totalPrice === 0) cartView.renderCartEmptyText();
  // setup listeners
  checkoutView.setupCheckoutRemoveListener(state.cart);
  checkoutView.setupCheckoutQuantitySelectListener(state.cart);
  checkoutView.slideAddress();

  elements.btnAddress.addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    state.checkout.makePayment(stripe);
    state.checkout.deleteCartSession();
  });
};

if (window.location.pathname === '/checkout') {
  window.addEventListener('loaded ', controlCheckout());
}

// MAPBOX

if (window.location.pathname === '/contact') {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxleGFuZGVya3JpcHBuZXIiLCJhIjoiY2tidnhzdXJnMDJ1bzJwbGp4b2JwdHh2cCJ9.FyIFeUXJ2Bm3Fe4nztnCcw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/alexanderkrippner/ckcwesr1906ra1ip9al6eu9h4', // stylesheet location
    center: [10.4515, 51.1657], // starting position [lng, lat]
    zoom: 5, // starting zoom
    maxZoom: 9,
  });

  var marker = new mapboxgl.Marker().setLngLat([10.4515, 51.1657]).addTo(map);

  var popup = new mapboxgl.Popup({ offset: 30, closeButton: false });

  var coordinates = [10.4515, 51.1657];
  var description = 'Come join us here!';

  popup.setLngLat(coordinates).setHTML(description).addTo(map);

  // map.on('load', function () {
  //   var popup = new mapboxgl.Popup({
  //     closeButton: false,
  //     closeOnClick: false,
  //   });

  //   map.on('mouseenter', 'places', function () {
  //     // Change the cursor style as a UI indicator.
  //     map.getCanvas().style.cursor = 'pointer';

  //     // Populate the popup and set its coordinates
  //     // based on the feature found.
  //     popup.setLngLat(coordinates).setHTML(description).addTo(map);
  //   });

  //   map.on('mouseleave', 'places', function () {
  //     map.getCanvas().style.cursor = '';
  //     popup.remove();
  //   });
  // });

  // MAP EVENT HANDLER
  elements.btnMap.addEventListener('click', () => {
    // Change navbar styles
    elements.contactLandingBg.classList.add(
      'contact-landing-bg-container--hidden'
    );
    elements.nav.classList.add('navigation__scrolled');
    elements.linkNav.forEach((link) =>
      link.classList.add('navigation__link--scrolled')
    );
    elements.navTitle.classList.add('navigation__title--scrolled');

    // Turn off observer to stop navbar transition
    navbarViews.sectionLandingObserver.disconnect();
  });
}

// let today = new Date();
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();
// let selectYear = document.getElementById('year');
// let selectMonth = document.getElementById('month');

// let months = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

// let monthAndYear = document.getElementById('monthAndYear');
// showCalendar(currentMonth, currentYear);

// function next() {
//   currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
//   currentMonth = (currentMonth + 1) % 12;
//   showCalendar(currentMonth, currentYear);
// }

// function previous() {
//   currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
//   currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//   showCalendar(currentMonth, currentYear);
// }

// function jump() {
//   currentYear = parseInt(selectYear.value, 10);
//   currentMonth = parseInt(selectMonth.value, 10);
//   showCalendar(currentMonth, currentYear);
// }

// function showCalendar(month, year) {
//   // firstDay is an index between 0-6 (Mon-Sunday)

//   let tbl = document.getElementById('calendar-body');

//   // clear cells

//   tbl.innerHTML = '';

//   // update calendar header
//   monthAndYear.innerHTML = `${months[month]} ${year}`;
//   selectYear.value = year;
//   selectMonth.value = month;

//   // fill calendar
//   let date = 1;

//   for (let i = 0; i < 6; i++) {
//     // create week rows

//     let row = document.createElement('tr');

//     // create day table datas

//     for (let j = 0; j < 7; j++) {
//       if (i === 0 && j < firstDay) {
//         let cell = document.createElement('td');
//         let cellText = document.createTextNode('');
//         cell.appendChild(cellText);
//         row.appendChild(cell);
//       }
//       // Stop incrementing date when number of days in month has been reached
//       else if (date > daysInMonth) {
//         break;
//       } else {
//         let cell = document.createElement('td');
//         let cellText = document.createTextNode(date);

//         // Highlight current date
//         if (
//           date === today.getDate() &&
//           year === today.getFullYear() &&
//           month === today.getMonth()
//         ) {
//           cell.classList.add('bg-info');
//         }
//         cell.appendChild(cellText);
//         row.appendChild(cell);
//         date++;
//       }
//     }

//     tbl.appendChild(row);
//   }
// }

// find what day of the week is the first day of the month
// set the grid-column of the first day of the month to corresponding weekday
// find the number of days in the month
// create html elements

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const renderCalendar = (month, year) => {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  const dateGrid = document.querySelector('.calendar__date-grid');
  const firstOfMonth = document.getElementById('first-of-month');
  console.log(firstOfMonth);
  firstOfMonth.setAttribute('datetime', `${year}-${month}-01`);
  firstOfMonth.setAttribute('style', `grid-column: ${firstDay + 1}`);
  // Create button element with child time element
  for (let i = 2; i <= daysInMonth; i++) {
    const dayOfMonth = document.createElement('button');

    const markup = `
    
    <button>
      <time datetime=${year}-${month}-${i}>${i}</time>
    </button>
    
    `;
    dateGrid.insertAdjacentHTML('beforeend', markup);
  }
};

renderCalendar(currentMonth, currentYear);
