const fs = require("fs");
const path = require("path");

const generateLease = (req, res) => {
  const {
    tenantName,
    apartmentNumber,
    leaseStart,
    leaseDuration,
    rent,
    securityDeposit,
  } = req.body;

  const templatePath = path.join(__dirname, "../lib/leaseTemplate.json");

  fs.readFile(templatePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading lease template" });
    }

    let leaseTemplate = JSON.parse(data);

    // Replace placeholders dynamically
    let lease = JSON.stringify(leaseTemplate)
      .replace(/{{DATE}}/g, new Date().toLocaleDateString())
      //   .replace(/{{LANDLORD_NAME}}/g, landlordName)
      //   .replace(/{{LANDLORD_ADDRESS}}/g, landlordAddress)
      .replace(/{{TENANT_NAME}}/g, tenantName)
      //   .replace(/{{TENANT_ADDRESS}}/g, tenantAddress)
      .replace(/{{PROPERTY_ADDRESS}}/g, apartmentNumber)
      //   .replace(/{{LEASE_TERM}}/g, leaseTerm)
      .replace(/{{START_DATE}}/g, leaseStart)
      .replace(/{{END_DATE}}/g, `${leaseDuration} months from ${leaseStart}`)
      .replace(/{{RENT_AMOUNT}}/g, rent);
    //   .replace(/{{DUE_DATE}}/g, dueDate);

    // Convert back to JSON object before sending
    lease = JSON.parse(lease);

    res.json({ lease });
  });
};

module.exports = { generateLease };
