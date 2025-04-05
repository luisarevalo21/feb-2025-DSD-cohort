require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./config/passportConfig");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const leaseRouter = require("./routes/lease");
const apartmentRouter = require("./routes/apartment");
const tenantRouter = require("./routes/tenant");
const complaintsRouter = require("./routes/complaints");
const accessControlRouter = require("./routes/accessControl")

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_BASE || "http://localhost:5173",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", ensureAuthenticated, usersRouter);
app.use("/auth", authRouter);

app.use("/api/complaints", ensureAuthenticated, complaintsRouter);
app.use("/api/lease", ensureAuthenticated, leaseRouter);
app.use("/api/tenant", ensureAuthenticated, tenantRouter);
app.use("/api/apartment", ensureAuthenticated, apartmentRouter);
app.use("/api/access-control", ensureAuthenticated, accessControlRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on localhost:4000, you better catch it!");
});

function errorHandler(err, req, res, next) {
  return res
    .status(res.statusCode !== 200 ? res.statusCode : 500)
    .json({ message: err.message });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new Error("Unauthorized"));
}

module.exports = app;
