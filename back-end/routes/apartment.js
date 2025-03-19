const express = require("express");
const router = express.Router();

const Apartment = require("../database/entities/apartment");
const AppDataSource = require("../database/data-source");
const {
  calculateLeaseExpiration,
} = require("../utilis/calculateLeaseExpiration");
const tenant = require("../database/entities/tenant");
router.get("/", async (req, res, next) => {
  try {
    const apartments = await AppDataSource.manager.find(Apartment, {
      relations: ["lease", "lease.tenant"],
    });

    if (apartments.length === 0) {
      return res.status(200).json([]);
    }

    const apartmentsFiltered = apartments.map((apartment) => {
      const { lease } = apartment;

      const leaseInformation = lease[0];

      let leaseExpired = null;
      if (leaseInformation?.lease_end_date !== undefined) {
        leaseExpired = calculateLeaseExpiration(
          leaseInformation.lease_end_date
        );
      }
      return {
        id: apartment.id,
        apartmentNumber: apartment.apartment_number,
        leaseId: leaseInformation ? leaseInformation.id : "",
        leaseStart: leaseInformation
          ? new Date(leaseInformation.lease_start_date).toLocaleDateString("en")
          : "",
        leaseEnd: leaseInformation
          ? new Date(leaseInformation.lease_end_date).toLocaleDateString("en")
          : "",
        setToExpire: leaseExpired,
        leaseStatus: leaseInformation ? leaseInformation.status : "",
        tenantName: leaseInformation
          ? `${leaseInformation.tenant.first_name} ${leaseInformation.tenant.last_name}`
          : "Vacant",
        tenantId: leaseInformation ? leaseInformation.tenant.id : "",
      };
    });

    if (apartmentsFiltered.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(apartmentsFiltered);
  } catch (error) {
    console.log("error", error);
    return next(error);
  }
});

router.get("/:apartmentId", async (req, res, next) => {
  const aptId = req.params.apartmentId;

  try {
    const apartment = await AppDataSource.manager.findOne(Apartment, {
      where: { id: aptId },
      relations: ["lease", "lease.tenant"],
    });

    if (!apartment) {
      return next(new Error("Apartment not found."));
    }

    const { lease } = apartment;

    const leaseInformation = lease[0];

    const apartmentInformation = {
      apartmentAddress: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
      leaseStartDate: leaseInformation
        ? new Date(leaseInformation.lease_start_date).toLocaleDateString("en")
        : "",
      leaseEndDate: leaseInformation
        ? new Date(leaseInformation.lease_end_date).toLocaleDateString("en")
        : "",
      tenantName: leaseInformation
        ? `${leaseInformation.tenant.first_name} ${leaseInformation.tenant.last_name}`
        : "",
      squareFootage: apartment.square_footage,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      floor: apartment.floor,
      features: apartment.features,
      notes: apartment.notes,
    };
    return res.status(200).json(apartmentInformation);
  } catch (error) {
    return next(error);
  }
});

router.put("/:apartmentId", async (req, res, next) => {
  const aptId = req.params.apartmentId;

  const editedData = req.body;
  try {
    const apartmentToUpdate = await AppDataSource.manager.findOne(Apartment, {
      where: { id: aptId },
    });

    if (!apartmentToUpdate) {
      return next(new Error("Apartment not found."));
    }

    if (editedData.notes !== undefined) {
      apartmentToUpdate.notes = editedData.notes;
    } else if (editedData.features !== undefined) {
      apartmentToUpdate.features = editedData.features;
    } else {
      return next(new Error("Incorrect data."));
    }

    await AppDataSource.manager.save(Apartment, apartmentToUpdate);
    return res.status(200).json(apartmentToUpdate);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
