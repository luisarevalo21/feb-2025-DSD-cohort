const express = require("express");
const router = express.Router();
const Lease = require("../database/entities/lease");
const { determineLeaseStatus } = require("../utilis/determineLeaseStatus");

const AppDataSource = require("../database/data-source");
const {
  calculateLeaseExpiration,
} = require("../utilis/calculateLeaseExpiration");

router.get("/renewals", async (req, res, next) => {
  try {
    const currentLeases = await AppDataSource.manager.find(Lease, {
      relations: ["tenant", "apartment"],
    });

    if (currentLeases.length === 0) {
      return res.status(200).json([]);
    }
    const renewableLeases = currentLeases.map((lease) => {
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
      .map((lease) => {
        const { apartment } = lease;
        const { tenant } = lease;

        if (lease.signed_at === null)
          return {
            id: lease.id,
            leaseId: lease.id,
            apartmentNumber: apartment.apartment_number,
            tenantName: `${tenant.first_name} ${tenant.last_name}`,
            leaseEnd: new Date(lease.lease_end_date).toLocaleDateString(
              "en-US"
            ),
          };
      })
      .filter((lease) => lease !== undefined);

    if (pendingLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(pendingLeases);
  } catch (error) {
    return next(error);
  }
});

router.get("/:leaseId", async (req, res, next) => {
  const leaseId = req.params.leaseId;

  try {
    const lease = await AppDataSource.manager.findOne(Lease, {
      where: { id: leaseId },
      relations: ["apartment", "tenant"],
    });

    if (!lease) {
      return next(new Error("Lease not found."));
    }

    const { apartment, tenant } = lease;

    const leaseInformation = {
      leaseId: lease.id,
      leaseStartDate: lease.lease_start_date,
      leaseEndDate: lease.lease_end_date,
      leaseStatus: determineLeaseStatus(lease),
      monthlyRent: lease.monthly_rent_in_dollars,
      leaseNotes: lease.notes,
      tenantInformation: {
        tenantId: tenant.id,
        tenantName: `${tenant.first_name} ${tenant.last_name}`,
        phoneNumber: tenant.phone_number,
        email: tenant.email,
      },
      apartmentInformation: {
        apartmentId: apartment.id,
        apartmentNumber: apartment.apartment_number,
        apartmentAddress: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
        squareFootage: apartment.square_footage,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        floor: apartment.floor,
        features: apartment.features,
        apartmentNotes: apartment.notes,
      },
    };
    return res.status(200).json(leaseInformation);
  } catch (error) {
    return next(error);
  }
});

router.put("/signLease/:leaseId", async (req, res, next) => {
  try {
    const leaseId = req.params.leaseId;
    const { signature } = req.body;
    const signedLease = await AppDataSource.manager.findOneBy(Lease, {
      id: leaseId,
    });
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

module.exports = router;
