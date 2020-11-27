const pool = require('./index');

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 20) {
  const queryParams = [];

  let queryStr = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  LEFT JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE active = true
  `;
  //WHERE 1 = 1

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `AND city LIKE $${queryParams.length}`;
  }
  
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryStr += `AND owner_id = $${queryParams.length}`;
  }
  
  const min = options.minimum_price_per_night * 100;
  const max = options.maximum_price_per_night * 100;

  if (min) {
    queryParams.push(min);
    queryStr += `AND cost_per_night >= $${queryParams.length}`;
  }

  if (max) {
    queryParams.push(max);
    queryStr += `AND cost_per_night <= $${queryParams.length}`;
  }


  queryStr += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryStr += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryStr += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryStr, queryParams)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryStr = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return pool.query(queryStr, queryParams)
    .then(res => res.rows);
};
exports.addProperty = addProperty;


module.exports = {
  getAllProperties,
  addProperty,
};