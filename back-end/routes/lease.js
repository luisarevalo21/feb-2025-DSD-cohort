const express = require("express");
const router = express.Router();
const Lease = require("../database/entities/lease");
const Apartment = require("../database/entities/apartment");
const AppDataSource = require("../database/data-source");
const { calculateLeaseExpiration } = require("../utilis/calculateLeaseExpiration");

router.get("/renewals", async (req, res, next) => {
  try {
    const currentLeases = await AppDataSource.manager.find(Lease, {
      relations: ["tenant", "apartment"],
    });

    if (currentLeases.length === 0) {
      return res.status(200).json([]);
    }
    const renewableLeases = currentLeases.map(lease => {
      const { apartment } = lease;
      const { tenant } = lease;

      if (calculateLeaseExpiration(lease.lease_end_date)) {
        return {
          id: lease.id,
          leaseId: lease.id,
          apartmentNumber: apartment.apartment_number,
          tenantName: `${tenant.first_name} ${tenant.last_name}`,
          leaseEnd: new Date(lease.lease_end_date).toLocaleDateString("en"),
        };
      }
    });

    if (renewableLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(renewableLeases);
  } catch (error) {
    return next(error);
  }
});

router.get("/pendingLeases", async (req, res, next) => {
  try {
    const currentLeases = await AppDataSource.manager.find(Lease, {
      relations: ["tenant", "apartment"],
    });

    if (currentLeases.length === 0) {
      return res.status(200).json([]);
    }
    const pendingLeases = currentLeases
      .map(lease => {
        const { apartment } = lease;
        const { tenant } = lease;

        if (lease.signed_at === null)
          return {
            id: lease.id,
            leaseId: lease.id,
            apartmentNumber: apartment.apartment_number,
            tenantName: `${tenant.first_name} ${tenant.last_name}`,
            leaseEnd: new Date(lease.lease_end_date).toLocaleDateString("en-US"),
          };
      })
      .filter(lease => lease !== undefined);

    if (pendingLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(pendingLeases);
  } catch (error) {
    return next(error);
  }
});

router.put("/signLease/:leaseId", async (req, res, next) => {
  try {
    const leaseId = req.params.leaseId;
    const { signature } = req.body;
    const signedLease = await AppDataSource.manager.findOneBy(Lease, { id: leaseId });
    if (!signedLease) {
      return next(new Error("Lease not found."));
    }
    signedLease.signed_at = new Date();
    signedLease.signature = signature;
    await AppDataSource.manager.save(Lease, signedLease);
    return res.status(200).json(signedLease);
  } catch (error) {
    return next(error);
  }
});

router.post("/new-lease", async (req, res, next) => {
  const leaseData = req.body;
  const apartmentId = req.body.apartmentId;

  const fetchedApartment = await AppDataSource.manager.findOne(Apartment, {
    where: { id: apartmentId },
    relations: ["lease"],
  });

  if (fetchedApartment.lease.length !== 0) {
    return res.status(200).json({
      message: "apartment already has a lease try again",
    });
  }

  //check if the dates ranges are correct

  const leaseStart = new Date(leaseData.leaseStartDate);
  const leaseEnd = new Date(leaseData.leaseEndDate);

  if (leaseEnd < leaseStart) {
    return res.status(200).json({
      message: "lease end dates start before the start date try again",
    });
  }

  try {
    const newLease = {
      lease_start_date: leaseData.leaseStartDate,
      lease_end_date: leaseData.leaseEndDate,
      monthly_rent_in_dollars: leaseData.rent,
      notes: leaseData.notes,
      apartment_id: leaseData.apartmentId,
      tenant_id: leaseData.tenantId,
    };

    await AppDataSource.manager.save(Lease, newLease);

    return res.status(200);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
