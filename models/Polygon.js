const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true,
        },
        coordinates: {
            type: [[[Number]]], // Array of arrays of arrays: [[[longitude, latitude], ...], ...]
            required: true,
        },
    },
}, { timestamps: true });

PolygonSchema.index({ geometry: '2dsphere' }); // Enable geospatial queries

module.exports = mongoose.model('Polygon', PolygonSchema);
