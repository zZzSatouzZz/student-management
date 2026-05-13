const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require(
  "../controllers/student.controller"
);

router.use(authMiddleware);

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;