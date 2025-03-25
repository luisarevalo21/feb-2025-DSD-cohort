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

router.get("/:id", async function (req, res, next) {
  const complaintId = req.params.id;

  const complaint = await AppDataSource.manager.findOne(Complaint, {
    where: { id: complaintId },
    relations: ["tenant"],
  });

  if (!complaint) {
    return next(new Error("Database error occurred"));
  }

  return res.status(200).json(complaint);
});

router.put("/:id", async function (req, res, next) {
  const complaintId = req.params.id;

  const complaint = await AppDataSource.manager.findOne(Complaint, {
    where: { id: complaintId },
  });

  if (!complaint) {
    return next(new Error("Database error occurred"));
  }

  await AppDataSource.manager.save(Complaint, {
    ...complaint,
    status: "Resolved",
  });

  return res.status(200).json({ message: "Complaint solved successfully" });
});

module.exports = router;
