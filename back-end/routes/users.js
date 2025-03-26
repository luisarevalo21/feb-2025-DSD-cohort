const express = require("express");
const AppDataSource = require("../database/data-source");
const router = express.Router();
const Admin = require("../database/entities/admin");

router.get("/me", (req, res) => {
  return res.status(200).json({ user: req.user });
});

router.delete("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const admin = await AppDataSource.manager.findOne(Admin, {
      where: { id: userId },
    });

    await AppDataSource.manager.delete(Admin, admin);

    req.logout((err) => {
      if (err) return next(new Error(err));
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "User deleted successfully" });
      });
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
