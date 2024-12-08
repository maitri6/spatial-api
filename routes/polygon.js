const express = require('express');
const router = express.Router();
const {
    addPolygon,
    updatePolygon,
    getPolygons,
    getIntersectingPolygons,
} = require('../controllers/polygonsController');

// Add a new polygon
router.post('/', addPolygon);

// Update a polygon
router.put('/:id', updatePolygon);

// Retrieve all polygons
router.get('/', getPolygons);

// Find polygons intersecting a given area
router.post('/intersecting', getIntersectingPolygons);

module.exports = router;
