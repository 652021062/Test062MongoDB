const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
dotenv.config();

// MongoDB Config
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routing Config
const bookRoutes = require('./routes/books');  
app.use('/api', bookRoutes);  
// Server Running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
