const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Tahe ahmed",
    email: "test@test.com",
    password: "password",
  },
];

// Endpoint : /api/users/
// get the users
const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

// Endpoint : /api/users/signup
// signing up a new user
const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

// Endpoint : /api/users/login
// loging in an existing user
const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
