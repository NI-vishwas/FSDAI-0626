const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    console.log("Listings retrieved:", listings);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single listing by ID
router.get("/:id", Listing, (req, res) => {
  res.json(res.listing);
});

// POST a new listing
router.post("/", async (req, res) => {
  const listing = new Listing({
    id: req.body.id,
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    photo: req.body.photo,
    availableUnits: req.body.availableUnits,
    wifi: req.body.wifi,
    laundry: req.body.laundry
  });

  try {
    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;