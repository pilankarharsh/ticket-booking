const Event = require('./model');

exports.createEvent = (req, res) => {
  const eventData = {
    title: req.body.title,
    description: req.body.description,
    event_date: req.body.event_date,
    location: req.body.location,
    organizer_id: req.user.userId
  };

  Event.createEvent(eventData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Event creation failed' });
    }
    res.status(201).json({
      message: 'Event created successfully',
      eventId: result.insertId
    });
  });
};

exports.getAllEvents = (req, res) => {
  Event.getAllEvents((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch events' });
    }
    res.json(results);
  });
};

exports.getEventById = (req, res) => {
  const eventId = req.params.id;

  Event.getEventById(eventId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch event' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(results[0]);
  });
};

exports.updateEvent = (req, res) => {
  const eventId = req.params.id;
  const eventData = req.body;

  Event.updateEvent(eventId, eventData, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Event update failed' });
    }
    res.json({ message: 'Event updated successfully' });
  });
};

exports.deleteEvent = (req, res) => {
  const eventId = req.params.id;

  Event.deleteEvent(eventId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Event deletion failed' });
    }
    res.json({ message: 'Event deleted successfully' });
  });
};
