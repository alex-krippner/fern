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
let selectedDate;
let templateMonth;
let templateDay;

/*
 ************************  LOCAL FUNCTIONS  ********************************
 */

const renderSummary = (name, party, month, day, email) => {
  elements.resSummary.innerHTML = `
  <p class="paragraph-primary">Hi ${name}, a table for ${
    parseInt(party, 10) + 1
  } has been booked for ${month} ${day}th.</p>
  <p class="paragraph-primary reservations__summary-paragraph">A booking confirmation has be sent to: ${email}</p>
  <p class="paragraph-primary reservations__summary-paragraph">We look forward to your visit.</p>

  `;
};

// Check if calendar date has been selected

const checkCalDates = () => {
  if (!calendarDateClicked) {
    document
      .querySelector('.calendar__date-required')
      .classList.add('calendar__date-required--reveal');
  } else if (calendarDateClicked) {
    document
      .querySelector('.calendar__date-required')
      .classList.remove('calendar__date-required--reveal');
  }
};

// Find selected calendar date

const findSelectedCalDate = () => {
  document.querySelectorAll('.calendar__dates').forEach((el) => {
    if (
      [...el.classList].find((index) => index === 'calendar__dates--selected')
    ) {
      selectedDate = el.childNodes[1].dateTime;
      return selectedDate;
    }
  });
};

// Prepare data for rendering summary

const prepSummaryRender = () => {
  templateDay = selectedDate.split('-')[2];
  templateMonth = months[parseInt(selectedDate.split('-')[1], 10) - 1];
  // Hide reservations__body::after; reservations__form-details; reservations__calendar
  const hideElArray = [elements.resFormDetails, elements.resCal];

  hideElArray.forEach((el) => {
    el.classList.add('reservations--hide');
  });

  elements.resBody.classList.add('reservations__body--hide');
};

// Render calendar dates function

const renderCalendarDates = (daysInMonth, month, year) => {
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
};

// Disable 'calLeft' button

const disableCalLeft = (curMonth, curYear) => {
  if (curMonth <= today.getMonth() && curYear === today.getFullYear()) {
    elements.btnCalLeft.disabled = true;
  } else if (curMonth > today.getMonth()) {
    elements.btnCalLeft.disabled = false;
  }
};

// Setup event listener for calendar dates

const setupCalDatesListener = () => {
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
};

/*
 ************************  EXPORTED FUNCTIONS  ********************************
 */
export const renderCalendar = (selectedMonth, selectedYear) => {
  if (!selectedMonth || !selectedYear) {
    selectedMonth = currentMonth;
    selectedYear = currentYear;
  }
  const firstDay = new Date(selectedYear, selectedMonth).getDay();
  const daysInMonth = 32 - new Date(selectedYear, selectedMonth, 32).getDate();

  // Clear calendar
  elements.dateGrid.textContent = '';
  elements.monthIndicator.textContent = '';

  // Update the calendar header with selected month and year
  elements.monthIndicator.textContent = `${months[selectedMonth]} ${selectedYear}`;

  // Create button element with child time element for each day of the month
  renderCalendarDates(daysInMonth, selectedMonth, selectedYear);

  // Set the first day of the month to corresponding weekday in order correctly align weekdays and dates

  /*********** firstOfMonth MUST COME AFTER CALENDAR DATES RENDERED */
  const firstOfMonth = elements.dateGrid.firstChild;
  firstOfMonth.setAttribute('style', `grid-column: ${firstDay + 1}`);

  // Disable the left button when current month
  disableCalLeft(currentMonth, selectedYear);

  // Add event listener to 'calendar date' buttons whenever calendar is rendered
  setupCalDatesListener();
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
      if (
        !document
          .getElementById('fname')
          .value.match(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/)
      ) {
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
  elements.btnReservations.addEventListener('click', (event) => {
    // Check if calendar date selected
    checkCalDates();

    if (
      document.getElementById('fname').checkValidity() &&
      document.getElementById('email').checkValidity() &&
      document.getElementById('phone').checkValidity() &&
      calendarDateClicked
    ) {
      // Find selected calendar date
      findSelectedCalDate();

      // Prepare day and month for use in template string
      prepSummaryRender();

      // Render summary template
      renderSummary(
        document.getElementById('fname').value.split(' ')[0],
        document.getElementById('party').selectedIndex,
        templateMonth,
        templateDay,
        document.getElementById('email').value
      );

      // Delay the reveal of reservations__summary
      setTimeout(() => {
        elements.resSummary.classList.add('reservations__summary--reveal');

        elements.btnReservations.setAttribute('style', 'visibility: hidden');
      }, 500);
      event.preventDefault();
    } else if (
      document.getElementById('fname').checkValidity() &&
      document.getElementById('email').checkValidity() &&
      document.getElementById('phone').checkValidity()
    ) {
      event.preventDefault();
    }
  });
};
