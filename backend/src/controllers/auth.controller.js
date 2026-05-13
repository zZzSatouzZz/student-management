const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/database");

// REGISTER
const register = async (req, res) => {
  try {

    const { name, email, password } =
      req.body;

    const hashPassword =
      await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users(name, email, password)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [
      name,
      email,
      hashPassword,
    ]);

    return res.json({
      success: true,
      message: "Register success",
    });

  } catch (error) {

    // email đã tồn tại
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
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
      process.env.JWT_SECRET,
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
  register,
  login,
};