/* eslint-disable no-undef */

const flkty = new Flickity('.carousel__main', {
  cellAlign: 'left',
  contain: true,
  prevNextButtons: false,
  wrapAround: true,
  autoPlay: true,
  setGallerySize: false,
  selectedAttraction: 0.01,
  friction: 0.15,
});

export default function executeCarousel() {
  return flkty;
}
