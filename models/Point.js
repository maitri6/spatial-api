const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    description: { type: String },
}, { timestamps: true });

PointSchema.index({ location: '2dsphere' }); // Spatial index for geospatial queries

module.exports = mongoose.model('Point', PointSchema);
