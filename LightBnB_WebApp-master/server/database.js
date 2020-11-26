const { getAllProperties, addProperty } = require('./database/properties');
const { getAllReservations } = require('./database/reservations');
const { getUserWithEmail, getUserWithId, addUser } = require('./database/users');


module.exports = {
  getAllProperties,
  addProperty,
  getAllReservations,
  getUserWithEmail,
  getUserWithId,
  addUser,
};