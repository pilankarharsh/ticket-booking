const Booking = require('./model');

exports.createBooking = (req, res) => {
  const { event_id } = req.body;
  const user_id = req.user.userId; 

  Booking.createBooking(user_id, event_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Booking failed' });
    }
    res.status(201).json({
      message: 'Booking successful',
      bookingId: result.insertId
    });
  });
};
exports.cancelBooking = (req, res) => {
  const bookingId = req.params.id;

  Booking.cancelBooking(bookingId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Cancel failed' });
    }
    res.json({ message: 'Booking cancelled successfully' });
  });
};

exports.getUserBookings = (req, res) => {
  const userId = req.params.userId;

  Booking.getUserBookings(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Fetch failed' });
    }
    res.json(results);
  });
};
