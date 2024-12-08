const Point = require('../models/Point');

// Add a new point
exports.addPoint = async (req, res) => {
    try {
        const { name, description, coordinates } = req.body;
        const point = new Point({
            name,
            description,
            location: { type: 'Point', coordinates },
        });
        await point.save();
        res.status(201).json(point);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a point
exports.updatePoint = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, coordinates } = req.body;
        const point = await Point.findByIdAndUpdate(
            id,
            { name, description, location: { type: 'Point', coordinates } },
            { new: true }
        );
        if (!point) return res.status(404).json({ message: 'Point not found' });
        res.json(point);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve all points
exports.getPoints = async (req, res) => {
    try {
        const points = await Point.find();
        res.json(points);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find points near a location
exports.getNearbyPoints = async (req, res) => {
    try {
        const { longitude, latitude, distance } = req.query;
        const points = await Point.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    $maxDistance: parseFloat(distance), // Distance in meters
                },
            },
        });
        res.json(points);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
