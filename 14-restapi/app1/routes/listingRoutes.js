const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");
const {
  toListingCreateDTO,
  toListingResponseDTO,
  toListingListResponseDTO
} = require("../dtos/listingDto");
const {
  createSuccessResponse,
  createErrorResponse
} = require("../dtos/apiResponseDto");

// GET all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    console.log("Listings retrieved:", listings);
    res.json(createSuccessResponse({
      message: "Listings retrieved successfully",
      data: toListingListResponseDTO(listings)
    }));
  } catch (err) {
    res.status(500).json(createErrorResponse({
      message: "Failed to retrieve listings",
      errors: err.message
    }));
  }
});

// GET a single listing by ID
router.get("/:id", async (req, res) => {
  const listingId = Number(req.params.id);

  if (Number.isNaN(listingId)) {
    return res.status(400).json(createErrorResponse({
      message: "Invalid listing id",
      errors: "Path parameter 'id' must be a number"
    }));
  }

  try {
    const listing = await Listing.findOne({ id: listingId });

    if (!listing) {
      return res.status(404).json(createErrorResponse({
        message: "Listing not found",
        errors: `No listing exists with id ${listingId}`
      }));
    }

    return res.json(createSuccessResponse({
      message: "Listing retrieved successfully",
      data: toListingResponseDTO(listing)
    }));
  } catch (err) {
    return res.status(500).json(createErrorResponse({
      message: "Failed to retrieve listing",
      errors: err.message
    }));
  }
});

// POST a new listing
router.post("/", async (req, res) => {
  const listing = new Listing(toListingCreateDTO(req.body));

  try {
    const newListing = await listing.save();
    res.status(201).json(createSuccessResponse({
      message: "Listing created successfully",
      data: toListingResponseDTO(newListing)
    }));
  } catch (err) {
    res.status(400).json(createErrorResponse({
      message: "Failed to create listing",
      errors: err.message
    }));
  }
});


module.exports = router;