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
      relations: ["lease", "tenant_details", "lease.apartment"],
    });

    if (tenant === null) {
      return res.status(200).json(null);
    }

    const tenantInformation = {
      tenantId: tenant.id,
      firstName: tenant.first_name,
      lastName: tenant.last_name,
      email: tenant.email,
      dateOfBirth: tenant.date_of_birth,
      tenantDetails: {
        phoneNumber: tenant.tenant_details.phone_number,
        profile_photo: tenant.tenant_details.phone_number,
        additionalInformation: tenant.tenant_details.additional_information,
      },
      leaseInformation: {
        leaseId: tenant.lease_id,
        leaseStartDate: tenant.lease.lease_start_date,
        leaseEndDate: tenant.lease.lease_end_date,
        rentAmount: tenant.lease.monthly_rent_amount,
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

module.exports = router;
