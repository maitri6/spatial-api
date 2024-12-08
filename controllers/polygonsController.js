const Polygon = require('../models/Polygon');

// Add a new polygon
exports.addPolygon = async (req, res) => {
    try {
        const { name, description, coordinates } = req.body;
        const polygon = new Polygon({
            name,
            description,
            geometry: { type: 'Polygon', coordinates },
        });
        await polygon.save();
        res.status(201).json(polygon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a polygon
exports.updatePolygon = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, coordinates } = req.body;
        const polygon = await Polygon.findByIdAndUpdate(
            id,
            { name, description, geometry: { type: 'Polygon', coordinates } },
            { new: true }
        );
        if (!polygon) return res.status(404).json({ message: 'Polygon not found' });
        res.json(polygon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve all polygons
exports.getPolygons = async (req, res) => {
    try {
        const polygons = await Polygon.find();
        res.json(polygons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find polygons intersecting a given area
exports.getIntersectingPolygons = async (req, res) => {
    try {
        const { coordinates } = req.body; // Pass a GeoJSON Polygon
        const intersectingPolygons = await Polygon.find({
            geometry: {
                $geoIntersects: {
                    $geometry: { type: 'Polygon', coordinates },
                },
            },
        });
        res.json(intersectingPolygons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
