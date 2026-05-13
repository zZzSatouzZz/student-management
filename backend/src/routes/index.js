const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

const studentRoutes = require(
  "./student.routes"
);

router.use("/auth", authRoutes);

router.use("/students", studentRoutes);

module.exports = router;