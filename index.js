const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
require("dotenv").config();


// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());


// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // Don't forget to call next to pass control to the next middleware
});


//49097422559256be8a821f7c8f71ee98ac0dcce2ac4ff6b4e85b5212e2edc492

//connecting to db
mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

  app.use('/api/players',playerRoutes)
  app.use("/api/teams", teamRoutes);
//   app.use("/api/matches", matchesRoutes);
//   app.use("/api/statistics", statisticsRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something went wrong");
});


// Start the Express server
const PORT = process.env.PORT || 4000; // Change the port to 3001 or any other available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
