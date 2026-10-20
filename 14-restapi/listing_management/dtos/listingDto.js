const LISTING_FIELDS = [
  "id",
  "name",
  "city",
  "state",
  "photo",
  "availableUnits",
  "wifi",
  "laundry"
];

const toListingCreateDTO = (payload = {}) => ({
  id: payload.id,
  name: payload.name,
  city: payload.city,
  state: payload.state,
  photo: payload.photo,
  availableUnits: payload.availableUnits,
  wifi: payload.wifi,
  laundry: payload.laundry
});

const toListingResponseDTO = (listing) => {
  if (!listing) return null;

  const source = typeof listing.toObject === "function"
    ? listing.toObject()
    : listing;

  return LISTING_FIELDS.reduce((dto, field) => {
    dto[field] = source[field];
    return dto;
  }, {});
};

const toListingListResponseDTO = (listings = []) =>
  listings.map(toListingResponseDTO);

module.exports = {
  toListingCreateDTO,
  toListingResponseDTO,
  toListingListResponseDTO
};
