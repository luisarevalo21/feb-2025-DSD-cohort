// Create Lease Flow in Front-End:
// 1. User fills out the form with lease details
// 2. User clicks the "Create Lease" button
// 3. Form data is validated
// 4. If form data is valid, a POST request is sent to the back-end
// 5. Back-end creates a new lease in the database
// 6. Back-end sends a response to the front-end
// 7. Front-end redirects to another page with pdf view of the lease

import { useState } from "react";

import { TextField, Button, Container, Typography, Box } from "@mui/material";
import apiRequest from "../../../back-end/lib/apiRequest";
import { useNavigate } from "react-router-dom";

const CreateLease = () => {
  const [leaseData, setLeaseData] = useState({
    tenantName: "",
    apartmentNumber: "",
    leaseStart: "",
    leaseDuration: 0,
    rent: 0,
    securityDeposit: 0,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //   const validate = () => {
  //     let newErrors = {};

  //     if (!leaseData.tenantName.trim())
  //       newErrors.tenantName = "Tenant name is required";
  //     if (!leaseData.propertyAddress.trim())
  //       newErrors.propertyAddress = "Property address is required";
  //     if (!leaseData.leaseStart)
  //       newErrors.leaseStart = "Lease start date is required";
  //     if (!leaseData.leaseEnd) newErrors.leaseEnd = "Lease end date is required";
  //     if (
  //       leaseData.leaseStart &&
  //       leaseData.leaseEnd &&
  //       leaseData.leaseStart > leaseData.leaseEnd
  //     )
  //       newErrors.leaseEnd = "End date must be after start date";
  //     if (!leaseData.rent) newErrors.rent = "Monthly rent is required";
  //     else if (leaseData.rent <= 0)
  //       newErrors.rent = "Rent must be a positive number";
  //     if (!leaseData.securityDeposit)
  //       newErrors.securityDeposit = "Security deposit is required";
  //     else if (leaseData.securityDeposit < 0)
  //       newErrors.securityDeposit = "Deposit cannot be negative";

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  const handleChange = (e) => {
    setLeaseData({ ...leaseData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validate()) {
    //   console.log("Lease Data Submitted:", leaseData);
    const response = await apiRequest.post("/leases/create-lease", leaseData);
    // const data = await response.json();
    console.log(response);
    console.log(response.data.lease);
    navigate("/lease-view", { state: { lease: response.data.lease } });

    // API call logic here
    // }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Create Lease
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tenant Name"
          name="tenantName"
          value={leaseData.tenantName}
          onChange={handleChange}
          error={!!errors.tenantName}
          helperText={errors.tenantName}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Apartment Number "
          name="apartmentNumber"
          value={leaseData.apartmentNumber}
          onChange={handleChange}
          error={!!errors.apartmentNumber}
          helperText={errors.apartmentNumber}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Lease Start Date"
          name="leaseStart"
          type="date"
          value={leaseData.leaseStart}
          onChange={handleChange}
          error={!!errors.leaseStart}
          helperText={errors.leaseStart}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="lease duration"
          name="leaseDuration"
          type="number"
          value={leaseData.leaseDuration}
          onChange={handleChange}
          error={!!errors.leaseDuration}
          helperText={errors.leaseDuration}
          margin="normal"
          required
        />
        {/* <TextField
          fullWidth
          label="Lease End Date"
          name="leaseEnd"
          type="date"
          value={leaseData.leaseEnd}
          onChange={handleChange}
          error={!!errors.leaseEnd}
          helperText={errors.leaseEnd}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
        /> */}
        <TextField
          fullWidth
          label="Monthly Rent ($)"
          name="rent"
          type="number"
          value={leaseData.rent}
          onChange={handleChange}
          error={!!errors.rent}
          helperText={errors.rent}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Security Deposit ($)"
          name="securityDeposit"
          type="number"
          value={leaseData.securityDeposit}
          onChange={handleChange}
          error={!!errors.securityDeposit}
          helperText={errors.securityDeposit}
          margin="normal"
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Lease
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateLease;
