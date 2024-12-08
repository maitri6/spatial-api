const express = require('express');
const router = express.Router();
const {
    addPoint,
    updatePoint,
    getPoints,
    getNearbyPoints,
} = require('../controllers/pointsController');

// Add a new point
router.post('/', addPoint);

// Update a point
router.put('/:id', updatePoint);

// Retrieve all points
router.get('/', getPoints);

// Retrieve points near a location
router.get('/nearby', getNearbyPoints);

module.exports = router;
