const pool = require('./index');

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryStr = `
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS avg_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON reservations.id = property_reviews.reservation_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;

  return pool.query(queryStr, [guest_id, limit])
    .then(res => {
      return res.rows;
    });
};

module.exports = {
  getAllReservations,
};