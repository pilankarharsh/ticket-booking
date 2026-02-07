const EVENT_API = 'http://localhost:3002/api/events';
const BOOKING_API = 'http://localhost:3003/api/booking';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

/* JWT PARSER */
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

const user = parseJwt(token);

/* SHOW CREATE EVENT FOR ORGANIZER */
if (user.role === 'ORGANIZER') {
  document.getElementById('createEventCard').style.display = 'block';
}

/* CREATE EVENT */
function createEventHandler() {
  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;

  fetch(EVENT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title,
      event_date: date,
      location
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Event created');
      location.reload();
    })
    .catch(() => alert('Event creation failed'));
}

/* BOOK EVENT */
function bookEvent(eventId) {
  fetch(BOOKING_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ event_id: eventId })
  })
    .then(res => res.json())
    .then(data => alert(data.message || 'Booked successfully'))
    .catch(() => alert('Booking failed'));
}

/* LOAD EVENTS */
fetch(EVENT_API)
  .then(res => res.json())
  .then(events => {
    const list = document.getElementById('eventList');
    list.innerHTML = '';

    if (!events.length) {
      document.getElementById('emptyEvents').style.display = 'block';
      return;
    }

    events.forEach(e => {
      list.innerHTML += `
        <div class="card">
          <h3>${e.title}</h3>
          <p><strong>Date:</strong> ${e.event_date}</p>
          <p><strong>Location:</strong> ${e.location}</p>

          ${
            user.role === 'USER'
              ? `<button class="btn btn-primary mt-2" onclick="bookEvent(${e.id})">
                   Book Ticket
                 </button>`
              : ''
          }
        </div>
      `;
    });
  })
  .catch(() => alert('Failed to load events'));
