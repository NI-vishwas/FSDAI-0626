const mongoose = require('mongoose');

/* 
_id: ObjectId("64a7f0e1c3f5b2a1d8e4f0a1")
id: 0
name: "Acme Fresh Start Housing"
city: "Chicago"
state: "IL"
photo: "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLK…"
availableUnits: 4
wifi: true
laundry: true
*/

const listingSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true, maxlength: [100, 'Name cannot exceed 100 characters'] },
    city: String,
    state: String,
    photo: String,
    availableUnits: Number,
    wifi: Boolean,
    laundry: Boolean
});

const Listing = mongoose.model('Listings', listingSchema);

module.exports = Listing;