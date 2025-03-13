const express = require("express");
const router = express.Router();

const Apartment = require("../database/entities/apartment");
const AppDataSource = require("../database/data-source");

router.get("/", async (req, res, next) => {
  try {
    const apartments = await AppDataSource.manager.find(Apartment);

    if (apartments.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(apartments);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
