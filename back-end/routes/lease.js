const express = require("express");
const router = express.Router();
const Lease = require("../database/entities/lease");

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

module.exports = router;
