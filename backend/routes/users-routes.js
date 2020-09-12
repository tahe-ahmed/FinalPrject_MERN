const express = require("express");
const { userValidationRules, validate } = require("../validation/validator.js");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/signup", userValidationRules() , validate, usersController.signup);

router.post("/login", usersController.login);

module.exports = router;
