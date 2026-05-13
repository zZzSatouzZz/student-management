const bcrypt = require("bcryptjs");

const pool = require("../config/database");

const { generateToken } = require("../utils/jwt");

const registerUser = async (body) => {
  const { email, password } = body;

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `
    INSERT INTO users(email, password)
    VALUES (?, ?)
    `,
    [email, hashedPassword]
  );

  return {
    id: result.insertId,
    email,
  };
};

const loginUser = async (body) => {
  const { email, password } = body;

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};