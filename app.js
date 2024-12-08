const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const indexRouter = require("./routes/index");
app.use("/api", indexRouter);

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
// app.use('/api/points', pointsRoutes);
// app.use('/api/polygons', polygonsRoutes );

// Start server

server.listen(5000,function(){
    console.log('Server running on port 5000');
});
