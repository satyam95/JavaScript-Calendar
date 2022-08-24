let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];
const newEventModal = document.getElementById("newEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");

import { loadCalendar } from './calendar.js';

function openModal(date) {
  clicked = date;
  newEventModal.style.display = "block";
  backDrop.style.display = "block";
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  loadCalendar();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({
      id: Math.random().toString(36).slice(-6),
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function openModalDelete(eventTitle, eventId){
  clicked = eventId;
  const eventForDay = events.find((e) => e.id === eventId && e.title === eventTitle);
  document.getElementById("eventText").innerText = eventForDay.title;
  deleteEventModal.style.display = "block";
  document.getElementById("deleteButton").addEventListener("click", () => deleteEvent(eventTitle, eventId));
}

function deleteEvent(eventTitle, eventId) {
  events = events.filter((e) => e.id !== eventId && e.title !== eventTitle);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document.getElementById("closeButton").addEventListener("click", closeModal);
  
}

export {openModal, openModalDelete, closeModal, initButtons, events};