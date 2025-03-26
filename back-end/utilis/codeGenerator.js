function generatePrimaryLockCode() {
  return Math.floor(Math.random() * 9000) + 1000;
}

function generateTempCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = { generatePrimaryLockCode, generateTempCode };
