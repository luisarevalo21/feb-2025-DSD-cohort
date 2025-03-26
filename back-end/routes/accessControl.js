const express = require("express");
const router = express.Router();

const AccessControl = require("../database/entities/accessControl");
const AppDataSource = require("../database/data-source");
const { generateTempCode } = require("../utilis/codeGenerator.js");


router.get("/", async (req, res, next) => {
  try {
    const accessControl = await AppDataSource.manager.find(AccessControl, {
      relations: ["apartment", "apartment.lease.tenant"],
    });

    if (accessControl.length === 0) {
      return res.status(200).json([]);
    }

    const accessControlFiltered = accessControl.map((control) => {
      const { apartment } = control;

      const tenant  = apartment.lease?.[0]?.tenant;

      return {
        id: control.id,
        apartmentId: apartment.id,
        apartmentNumber: apartment.apartment_number,
        tenantId: tenant ? tenant.id : null,
        tenantName: tenant ? `${tenant.first_name} ${tenant.last_name}`: "Apartment Vacant",
        primaryLockCode: control.primary_lock_code,
        tempCode: control.temp_code ? control.temp_code : null,
        tempCodeExpiration: control.temp_code ? control.expires_at : null
      };
    });

    if (accessControlFiltered.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(accessControlFiltered);
  } catch (error) {
    return next(error);
  }
});

router.put("/:accessControlId", async (req, res, next) => {
  const { accessControlId } = req.params;
//   const editedData = req.body;
  try {
    const accessControlToUpdate = await AppDataSource.manager.findOne(AccessControl, {
      where: { id: accessControlId },
    });

    if (!accessControlToUpdate) {
      return next(new Error("Access control not found."));
    }

    const newTempCode = generateTempCode();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    accessControlToUpdate.temp_code = newTempCode;
    accessControlToUpdate.expires_at = expiresAt;

    await AppDataSource.manager.save(AccessControl, accessControlToUpdate);
    return res.status(200).json(accessControlToUpdate);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
