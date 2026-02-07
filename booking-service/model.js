const db = require('./config/db');

exports.createBooking = (userId, eventId, callback) => {
  const sql = `
    INSERT INTO bookings (user_id, event_id, status)
    VALUES (?, ?, 'BOOKED')
  `;
  db.query(sql, [userId, eventId], callback);
};

exports.cancelBooking = (bookingId, callback) => {
  const sql = `
    UPDATE bookings
    SET status = 'CANCELLED'
    WHERE id = ?
  `;
  db.query(sql, [bookingId], callback);
};

exports.getUserBookings = (userId, callback) => {
  const sql = `
    SELECT * FROM bookings
    WHERE user_id = ?
  `;
  db.query(sql, [userId], callback);
};
