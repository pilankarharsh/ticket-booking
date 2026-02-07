const db = require('./config/db');

exports.createEvent = (eventData, callback) => {
  const { title, description, event_date, location, organizer_id } = eventData;

  const sql = `
    INSERT INTO events (title, description, event_date, location, organizer_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, event_date, location, organizer_id],
    callback
  );
};

exports.getAllEvents = (callback) => {
  const sql = `SELECT * FROM events`;
  db.query(sql, callback);
};

exports.getEventById = (eventId, callback) => {
  const sql = `SELECT * FROM events WHERE id = ?`;
  db.query(sql, [eventId], callback);
};

exports.updateEvent = (eventId, eventData, callback) => {
  const { title, description, event_date, location } = eventData;

  const sql = `
    UPDATE events
    SET title = ?, description = ?, event_date = ?, location = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, description, event_date, location, eventId],
    callback
  );
};

exports.deleteEvent = (eventId, callback) => {
  const sql = `DELETE FROM events WHERE id = ?`;
  db.query(sql, [eventId], callback);
};
