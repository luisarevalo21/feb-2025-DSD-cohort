const express = require("express");
const router = express.Router();
const lease = require("../database/entities/lease");

const AppDataSource = require("../database/data-source");

router.get("/expiringLeases", async (req, res, next) => {
  //fetch all leases from database
  //will use mock data to mimick since its not connected or data doesn't exist just yet
  //mock resposne to database
  //   const response = Db.fetch(leases)
  //   const response = [];
  //   if (response.length === 0) {
  //     return res.status(400).json([]);
  //   }
  try {
    const mockLeaseData = await AppDataSource.manager.find(lease);

    if (mockLeaseData.length === 0) {
      return res.status(200).json([]);
    }

    const today = new Date();
    const endRange = new Date();

    endRange.setDate(endRange.getDate() + 30);
    const filteredLeases = mockLeaseData.filter(lease => {
      const leaseEndDate = new Date(lease.lease_end_date);
      return today <= leaseEndDate && leaseEndDate <= endRange;
    });

    if (filteredLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(filteredLeases);
  } catch (error) {
    return next(error);
  }
});

//set up cors and send to the frontend to display
module.exports = router;
