const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const listingRoutes = require("./routes/listingRoutes");
const authenticateJwt = require("./middleware/authenticateJwt");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./dtos/swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/listings", authenticateJwt, listingRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });