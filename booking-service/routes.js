const express = require('express');
const router = express.Router();

const bookingController = require('./controller');
const authMiddleware = require('./middleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.delete('/:id', authMiddleware, bookingController.cancelBooking);
router.get('/user/:userId', authMiddleware, bookingController.getUserBookings);

module.exports = router;
