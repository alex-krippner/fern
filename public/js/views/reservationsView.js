import { elements } from './base.js';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let todayDate = today.getDate();
let calendarDateClicked = false;

export const renderCalendar = (month, year) => {
  if (!month || !year) {
    month = currentMonth;
    year = currentYear;
  }
  // Clear calendar
  elements.dateGrid.textContent = '';
  elements.monthIndicator.textContent = '';

  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  elements.monthIndicator.textContent = `${months[month]} ${year}`;

  // Create button element with child time element for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    // Create button HTML tag for every day of the month and assign class and attribute
    const dayOfMonth = document.createElement('button');
    dayOfMonth.classList.add('calendar__dates');
    dayOfMonth.setAttribute('type', 'button');

    dayOfMonth.innerHTML = `
        <time datetime=${year}-${month + 1}-${i}>${i}</time>
      `;

    // Distinguish between past and future days
    if (month === today.getMonth() && i < todayDate) {
      dayOfMonth.classList.add('calendar__dates--opaque');
      dayOfMonth.disabled = true;
    } else if (i >= todayDate || month >= today.getMonth()) {
      dayOfMonth.classList.add('calendar__dates--valid');
    }

    elements.dateGrid.appendChild(dayOfMonth);
  }

  // Set the first day of the month to corresponding weekday in order correctly align weekdays and dates
  const firstOfMonth = elements.dateGrid.firstChild;
  firstOfMonth.setAttribute('style', `grid-column: ${firstDay + 1}`);

  // Disable the left button when current month
  if (currentMonth <= today.getMonth()) {
    elements.btnCalLeft.disabled = true;
  } else if (currentMonth > today.getMonth()) {
    elements.btnCalLeft.disabled = false;
  }

  // Add event listener to 'calendar date' buttons whenever calendar is rendered
  document.querySelectorAll('.calendar__dates').forEach((el) => {
    el.addEventListener('click', function () {
      // Remove 'selected date' styling from other button
      document.querySelectorAll('.calendar__dates').forEach((elRem) => {
        elRem.classList.remove('calendar__dates--selected');
      });

      // Add 'selected date' styling to clicked button
      el.classList.add('calendar__dates--selected');
      calendarDateClicked = true;

      if (calendarDateClicked) {
        document
          .querySelector('.calendar__date-required')
          .classList.remove('calendar__date-required--reveal');
      }

      return calendarDateClicked;
    });
  });
  bookTableListener();
};

// CALENDAR BUTTON FUNCTIONALITY

export const next = () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  renderCalendar(currentMonth, currentYear);
};

export const previous = () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar(currentMonth, currentYear);
};

/*
 ************************  RENDER SUMMARY  ********************************
 */

const renderSummary = (name, party, month, day, email) => {
  elements.resSummary.innerHTML = `
  <p class="paragraph-primary">Hi ${name}, a table for ${
    parseInt(party, 10) + 1
  } has been booked for ${month} ${day}th.</p>
  <p class="paragraph-primary">A booking confirmation has be sent to: ${email}</p>
  <p class="paragraph-primary">We look forward to your visit.</p>

  `;
};

/*
 ************************ VALIDATORS  ********************************
 */

// INPUT VALIDATORS
export const validationListener = () => {
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      input.checkValidity();
    });
  });
  formInputs.forEach((input) => {
    input.addEventListener('invalid', () => {
      if (!formInputs[0].value.match(/^(\w\w+)\s(\w+)$/)) {
        input.setCustomValidity('Please enter first and last name');
      } else {
        input.setCustomValidity('This field is required');
      }
    });
  });
};

/*
 ************************ 'BOOK TABLE' BUTTON LISTENER  ********************************
 */

export const bookTableListener = () => {
  let month;
  let day;
  elements.btnReservations.addEventListener('click', (event) => {
    let selectedDate;

    if (!calendarDateClicked) {
      document
        .querySelector('.calendar__date-required')
        .classList.add('calendar__date-required--reveal');
    } else if (calendarDateClicked) {
      document
        .querySelector('.calendar__date-required')
        .classList.remove('calendar__date-required--reveal');
    }
    if (
      document.getElementById('fname').checkValidity() &&
      document.getElementById('email').checkValidity() &&
      document.getElementById('phone').checkValidity() &&
      calendarDateClicked
    ) {
      // Find selected calendar date
      document.querySelectorAll('.calendar__dates').forEach((el) => {
        if (
          [...el.classList].find(
            (index) => index === 'calendar__dates--selected'
          )
        ) {
          selectedDate = el.childNodes[1].dateTime;
          return selectedDate;
        }
      });

      // Prepare day and month for use in template string
      day = selectedDate.split('-')[2];
      month = months[parseInt(selectedDate.split('-')[1], 10) - 1];
      // Hide reservations__body::after; reservations__form-details; reservations__calendar
      const hideElArray = [elements.resFormDetails, elements.resCal];

      hideElArray.forEach((el) => {
        el.classList.add('reservations--hide');
      });

      elements.resBody.classList.add('reservations__body--hide');

      // Render summary template

      renderSummary(
        document.getElementById('fname').value.split(' ')[0],
        document.getElementById('party').selectedIndex,
        month,
        day,
        document.getElementById('email').value
      );

      // Delay the reveal of reservations__summary
      setTimeout(() => {
        elements.resSummary.classList.add('reservations__summary--reveal');
      }, 500);
      event.preventDefault();
    }
  });
};

// create modal covering reservations section
// include reservations summary container
// create template string with values of form controls

// click on 'book table' button
// set modal display to block
//
