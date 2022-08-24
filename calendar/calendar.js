let monthPointer = 0;
import { openModal, openModalDelete, initButtons, events } from "./modal.js";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const nextIconSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" wicurrentDateh="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>`;
const prevIconSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" wicurrentDateh="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>`;

const calendar = document.getElementById("calendar");

function loadCalendar() {
  const currentDate = new Date();

  if (monthPointer !== 0) {
    currentDate.setMonth(new Date().getMonth() + monthPointer);
  }

  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const dateString = firstDayOfMonth.toLocaleDateString("en-in", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  calendar.innerHTML = "";

  const calendarHeader = document.createElement("div");
  calendarHeader.classList.add("calendarHeaderBlock");

  const prevButton = document.createElement("div");
  prevButton.classList.add("prevBtn");
  prevButton.innerHTML = prevIconSvg;
  prevButton.addEventListener("click", () => {
    monthPointer--;
    loadCalendar();
  });
  calendarHeader.appendChild(prevButton);

  const monthNameYear = document.createElement("div");
  monthNameYear.classList.add("monthNameYearText");
  monthNameYear.innerText = `${currentDate.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendarHeader.appendChild(monthNameYear);

  const nextButton = document.createElement("div");
  nextButton.classList.add("nextBtn");
  nextButton.innerHTML = nextIconSvg;
  nextButton.addEventListener("click", () => {
    monthPointer++;
    loadCalendar();
  });
  calendarHeader.appendChild(nextButton);

  calendar.appendChild(calendarHeader);

  const weekdayRow = document.createElement("div");
  weekdayRow.classList.add("weekdayBlock");
  for (let i = 0; i <= 6; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("weekdayName");
    daySquare.innerText = weekdays[i];
    weekdayRow.appendChild(daySquare);
  }
  calendar.appendChild(weekdayRow);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const emptyDays = weekdays.indexOf(dateString.split(", ")[0]);

  const calendarRow = document.createElement("div");
  calendarRow.classList.add("calendarBlock");

  for (let i = 1; i <= emptyDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const day = `${i - emptyDays}/${month + 1}/${year}`;

    if (i > emptyDays) {
      daySquare.innerText = i - emptyDays;

      const eventForDay = events.filter(item => item.date === day);

      if (eventForDay.length > 0){
        for (let i = 0; i < eventForDay.length; i++) {
          const eventChip = document.createElement("div");
          eventChip.classList.add('eventChip');
          const eventId = eventForDay[i].id;
          eventChip.id = eventId;
          const eventTitle = eventForDay[i].title;
          eventChip.innerText = eventTitle;
          daySquare.appendChild(eventChip);
          eventChip.addEventListener("click", () => openModalDelete(eventTitle, eventId));
        }
      }

      const addButton = document.createElement("div");
      addButton.classList.add("addSymbol");
      addButton.innerHTML = "<span>&#43;</span>";
      daySquare.appendChild(addButton);
      addButton.addEventListener("click", () => openModal(day));
    } else {
      daySquare.classList.add("emptyDay");
    }
    calendarRow.appendChild(daySquare);
  }
  calendar.appendChild(calendarRow);
}
initButtons();
loadCalendar();
export {loadCalendar};
