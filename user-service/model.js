const db = require('./config/db');

exports.createUser = (userData, callback) => {
  const { name, email, password, role } = userData;

  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, password, role], callback);
};

exports.findByEmail = (email, callback) => {
  const sql = `
    SELECT * FROM users WHERE email = ?
  `;
  db.query(sql, [email], callback);
};

exports.getUserById = (userId, callback) => {
  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
  `;
  db.query(sql, [userId], callback);
};
