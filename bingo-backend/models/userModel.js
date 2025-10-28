import { db } from '../config/db.js';

export const createUser = async (username, email, password) => {
  const connection = await db();  // <- await the connection
  const [result] = await connection.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result;
};

export const findUserByEmail = async (email) => {
  const connection = await db(); // <- await the connection
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};
