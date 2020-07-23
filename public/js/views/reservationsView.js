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
    const dayOfMonth = document.createElement('button');
    dayOfMonth.classList.add('calendar__dates');

    dayOfMonth.innerHTML = `
        <time datetime=${year}-${month}-${i}>${i}</time>
      `;

    if (i < todayDate) {
      dayOfMonth.classList.add('calendar__dates--opaque');
    } else if (i === todayDate) {
      dayOfMonth.setAttribute('id', 'calendar__dates-today');
    }
    elements.dateGrid.appendChild(dayOfMonth);
  }

  // Set the first day of the month to corresponding weekday in order correctly align weekdays and dates
  const firstOfMonth = elements.dateGrid.firstChild;
  firstOfMonth.setAttribute('style', `grid-column: ${firstDay + 1}`);
};

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
