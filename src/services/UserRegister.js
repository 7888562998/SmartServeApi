const registration = require("../models/signUp");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUp = async (req, res) => {
  try {
    const createUser = new registration(req.body);

    console.log("body", req.body);

    const userCreated = await createUser.save();

    console.log("userCreated", userCreated);

    // ✅ Generate JWT token after successful save
    jwt.sign(
      { user: userCreated },
      process.env.SECRET_KEY,
      (error, token) => {
        console.log("token", token);
        res.status(200).send({
          token: token,
          user: userCreated,
        });
      }
    );

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const logIn = async (req, res) => {
  try {
    console.log("body", req.body);
    const user = await registration.find(req.body);
    if (user.length > 0) {
      console.log(user, "user1111");
      jwt.sign(
        { user: user },
        process.env.SECRET_KEY,
        (error, token) => {
          console.log("token", token);
          res.status(200).send({
            token: token,
            user: user,
          });
        }
      );
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  signUp,
  logIn,
};
