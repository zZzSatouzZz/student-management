require("dotenv").config();

const app = require("./app");

const pool = require("./config/database");

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await pool.getConnection();

    console.log("Connect MySQL Success");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();