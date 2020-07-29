import { elements } from './base.js';

export const setupMap = () => {
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
};

/*************************************************  NEWSLETTER  *******************************************************************/
export const newsletterValidator = () => {
  elements.newsletterInput.addEventListener('input', () => {
    elements.newsletterInput.setCustomValidity('');
    elements.newsletterInput.checkValidity();
  });

  elements.newsletterInput.addEventListener('invalid', () => {
    if (elements.newsletterInput.value === '') {
      elements.newsletterInput.setCustomValidity('Please enter an email');
    }
  });
};

export const toggleModal = (event) => {
  if (elements.newsletterInput.checkValidity()) {
    event.preventDefault();
    elements.modal.classList.toggle('show-modal');
  }
};

export const windowOnClick = (event) => {
  if (event.target === elements.modal) {
    toggleModal();
  }
};
