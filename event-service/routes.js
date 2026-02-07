const express = require('express');
const router = express.Router();

const eventController = require('./controller');
const authMiddleware = require('./middleware');

router.post('/', authMiddleware, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
