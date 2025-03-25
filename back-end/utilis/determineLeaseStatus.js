const determineLeaseStatus = (lease) => {
  if (lease?.signed_at) {
    return "Active";
  } else {
    return "Pending";
  }
};

module.exports = { determineLeaseStatus };
