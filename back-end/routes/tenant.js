const express = require("express");
const router = express.Router();
const Tenant = require("../database/entities/tenant");
const AppDataSource = require("../database/data-source");

router.get("/", async (req, res, next) => {
  try {
    const tenants = await AppDataSource.manager.find(Tenant);

    if (tenants.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(tenants);
  } catch (error) {
    return next(error);
  }
});

router.get("/:tenantId", async (req, res, next) => {
  const id = req.params.tenantId;

  try {
    const tenant = await AppDataSource.manager.findOne(Tenant, {
      where: { id: id },
      relations: ["lease", "lease.apartment"],
    });

    if (!tenant) {
      return next(new Error("Tenant not found."));
    }
    const tenantInformation = {
      tenantId: tenant.id,
      firstName: tenant.first_name,
      lastName: tenant.last_name,
      email: tenant.email,
      dateOfBirth: new Date(tenant.date_of_birth).toLocaleDateString("en"),
      phoneNumber: tenant.phone_number,
      // profile_photo: tenant.phone_number,
      additionalInformation: tenant.additional_information,
      leaseInformation: {
        leaseId: tenant.lease_id,
        leaseStartDate: new Date(
          tenant.lease.lease_start_date
        ).toLocaleDateString("en"),
        leaseEndDate: new Date(tenant.lease.lease_end_date).toLocaleDateString(
          "en"
        ),
        rentAmount: tenant.lease.monthly_rent_in_dollars,
        notes: tenant.lease.notes,
      },
      apartment: {
        apartmentId: tenant.lease.apartment.id,
        apartmentNumber: tenant.lease.apartment.apartment_number,
        floor: tenant.lease.apartment.floor,
        bedrooms: tenant.lease.apartment.bedrooms,
        bathrooms: tenant.lease.apartment.bathrooms,
        squareFootage: tenant.lease.apartment.square_footage,
        notes: tenant.lease.apartment.notes,
      },
    };

    return res.status(200).json(tenantInformation);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const tenantDetails = req.body;

  if (!tenantDetails) {
    return res.status(200).json("no data found");
  }

  const foundTenant = await AppDataSource.manager.findOne(Tenant, {
    where: { email: tenantDetails.email },
  });

  if (foundTenant) {
    return res.status(200).json({ message: "tenant already exists" });
  }

  try {
    const newTenant = {
      first_name: tenantDetails.firstName,
      last_name: tenantDetails.lastName,
      email: tenantDetails.email,
      date_of_birth: tenantDetails.dateOfBirth,
      phone_number: tenantDetails.phoneNumber || "",
      additional_information: tenantDetails.additionalInformation || "",
    };

    await AppDataSource.manager.save(Tenant, newTenant);

    return res.status(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
