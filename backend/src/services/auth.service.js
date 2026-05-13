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

const login = async (req, res) => {
  try {

    const { email, password } =
      req.body;

    const sql =
      "SELECT * FROM users WHERE email = ?";

    const [results] =
      await db.query(sql, [email]);

    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Email does not exist",
      });
    }

    const user = results[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "JWT_SECRET",
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      message: "Login success",
      data: {
        token,
        user,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};