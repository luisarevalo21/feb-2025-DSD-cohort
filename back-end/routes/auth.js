// Auth Route
const express = require("express");
const router = express.Router();
const passport = require("../config/passportConfig.js"); // Import passport setup

router.post("/login", function(req, res, next) {
  passport.authenticate("local", (err, user, info, status) => {
    //does handling based off the returned values from local strategy;
    //info is for returned information added as a third parameter to callback in local strategy
    //status is optional for returned status codes from local strategy as
    if (err) return next(err) //goes to error handler with text of error that occurred in the local strategy

    else {
      req.logIn(user, function() {
        return res.json(user)
      });
    }
  })(req, res, next); // pass in req, res, and next to the passport local strategy function
});

router.post("/signup", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //If any fields are missing, for now throw a general error to error handling middleware in app.js. As a seperate later task we can add in a validation library.
  if (!firstName || !lastName || !email || !password) {
    return next(new Error("Missing required fields"));
  }

  //Later task: Here we would check if the email is already registered and throw an error if they are. Otherwise, insert the new user into the database
  const newUser = {
    id: 2,
    firstName,
    lastName,
    email,
    password,
  };

  //Logs in the user with passport's req.logIn method.
  req.logIn(newUser, (err) => {
    if (err) return next(err);

    //Returns the new user object and a mock redirect path to dashboard.
    return res.json({user: newUser, redirect: "/dashboard"})
  })
})

module.exports = router;