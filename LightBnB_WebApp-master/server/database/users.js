const pool = require('./index');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`
 SELECT * FROM users
 WHERE email = $1;
 `,[`${email}`])
    .then(users =>  {
      for (const user of users.rows) {
        return user;
      }
      return null;
    });
};


/**
 * Get a single user from the database given their id.
 * @param {string} id The idpromise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1;
  `,[id])
    .then(users =>  {
      for (const user of users.rows) {
        return user;
      }
      return null;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser =  function(user) {
  const queryStr = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const queryP = [`${user.name}`, `${user.email}`, `${user.password}`];

  return pool.query(queryStr, queryP)
    .then(res => {
      return res.rows;
    });
};


module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
};