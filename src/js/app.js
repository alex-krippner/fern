let sliderImages = document.querySelectorAll(".carousel__slide"),
  btnCarouselOne = document.querySelector(".btn-carousel--1"),
  btnCarouselTwo = document.querySelector(".btn-carousel--2");
current = 0;

// Clears images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next

function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// button 1 click

btnCarouselOne.addEventListener("click", function () {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// button 2 click

btnCarouselTwo.addEventListener("click", function () {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();
