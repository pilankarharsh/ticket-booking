const BOOKING_API = 'http://localhost:3003/api/bookings';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

// Decode JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

const userId = parseJwt(token).userId;

fetch(`${BOOKING_API}/user/${userId}`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(bookings => {
    const list = document.getElementById('bookingList');
    const emptyState = document.getElementById('emptyState');

    if (!bookings || bookings.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    bookings.forEach(b => {
      const statusClass =
        b.status === 'BOOKED' ? 'status-booked' : 'status-cancelled';

      list.innerHTML += `
        <div class="card">
          <div class="booking-meta">
            <h3>Event ID: ${b.event_id}</h3>
            <span class="status-badge ${statusClass}">
              ${b.status}
            </span>
          </div>

          <p><strong>Booking Date:</strong>
            ${new Date(b.booking_date).toLocaleDateString()}
          </p>

          ${
            b.status === 'BOOKED'
              ? `
                <div class="booking-actions">
                  <button class="btn btn-danger"
                    onclick="cancelBooking(${b.id})">
                    Cancel Booking
                  </button>
                </div>
              `
              : ''
          }
        </div>
      `;
    });
  });

function cancelBooking(bookingId) {
  if (!confirm('Cancel this booking?')) return;

  fetch(`${BOOKING_API}/${bookingId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      location.reload();
    });
}
