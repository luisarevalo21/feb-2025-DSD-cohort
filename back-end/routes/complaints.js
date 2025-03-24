const express = require("express");
const router = express.Router();
const AppDataSource = require("../database/data-source");
const Complaint = require("../database/entities/complaint");

router.get("/", async function (req, res, next) {
  const complaints = await AppDataSource.manager.find(Complaint);

  if (!complaints || !Array.isArray(complaints)) {
    return next(new Error("Database error occurred"));
  }

  return res.status(200).json(complaints);
});

module.exports = router;
