const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");
const {
  toListingCreateDTO,
  toListingResponseDTO,
  toListingListResponseDTO
} = require("../dtos/listingDto");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    console.log("Listings retrieved:", listings);
    res.json(toListingListResponseDTO(listings));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single listing by ID
router.get("/:id", Listing, (req, res) => {
  res.json(toListingResponseDTO(res.listing));
});

// POST a new listing
router.post("/", async (req, res) => {
  const listing = new Listing(toListingCreateDTO(req.body));

  try {
    const newListing = await listing.save();
    res.status(201).json(toListingResponseDTO(newListing));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;