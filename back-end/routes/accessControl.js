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

// DON'T DELETE BELOW COMMENTED CODE. GOING TO USE IT TO REFERENCE CREATING A PUT ROUTE TO CHANGE TEMP_CODE IN DB.
// router.put("/:apartmentId", async (req, res, next) => {
//   const aptId = req.params.apartmentId;

//   const editedData = req.body;
//   try {
//     const apartmentToUpdate = await AppDataSource.manager.findOne(Apartment, {
//       where: { id: aptId },
//     });

//     if (!apartmentToUpdate) {
//       return next(new Error("Apartment not found."));
//     }

//     if (editedData.notes !== undefined) {
//       apartmentToUpdate.notes = editedData.notes;
//     } else if (editedData.features !== undefined) {
//       apartmentToUpdate.features = editedData.features;
//     } else {
//       return next(new Error("Incorrect data."));
//     }

//     await AppDataSource.manager.save(Apartment, apartmentToUpdate);
//     return res.status(200).json(apartmentToUpdate);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
