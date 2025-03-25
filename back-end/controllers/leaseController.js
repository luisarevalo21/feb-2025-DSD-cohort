const fs = require("fs");
const path = require("path");

const generateLease = (req, res) => {
  const { tenantName, apartmentNumber, leaseStart, leaseDuration, rent } =
    req.body;

  const templatePath = path.join(__dirname, "../lib/leaseTemplate.json");

  fs.readFile(templatePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading lease template" });
    }

    let leaseTemplate = JSON.parse(data);

    let lease = JSON.stringify(leaseTemplate)
      .replace(/{{DATE}}/g, new Date().toLocaleDateString())
      .replace(/{{TENANT_NAME}}/g, tenantName)
      .replace(/{{PROPERTY_ADDRESS}}/g, apartmentNumber)
      .replace(/{{START_DATE}}/g, leaseStart)
      .replace(/{{END_DATE}}/g, `${leaseDuration} months from ${leaseStart}`)
      .replace(/{{RENT_AMOUNT}}/g, rent);

    lease = JSON.parse(lease);

    res.json({ lease });
  });
};

module.exports = { generateLease };
