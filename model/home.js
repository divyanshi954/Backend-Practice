const mongoose = require('mongoose');
const favourite = require('./fav');

const homeSchema = mongoose.Schema({
  homename: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  photoURL: String,
})

homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()._id;
  await favourite.deleteMany({homeId : homeId});
  next;
});

module.exports = mongoose.model('Home', homeSchema);