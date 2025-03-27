import { Box, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";
import DeleteAccountFlow from "../components/DeleteAccountFlow";

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [propertyName, setPropertyName] = useState("The Ridge");
  const [tempPropertyName, setTempPropertyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get("/users/me").then((res) => res.data.user),
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
    if (error) {
      toast.error("Failed to fetch user info. Please try again later.");
    }
  }, [user, error]);

  const handleEmailSave = () => {
    setEmail(tempEmail);
    toast.success("Email updated successfully!");
  };

  const handlePropertyNameSave = () => {
    setPropertyName(tempPropertyName);
    toast.success("Property name updated successfully!");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <Box sx={{ display: "inline-block" }}>
        <Box sx={{ border: 0.5, borderRadius: 1, display: "inline-block" }}>
          <Typography
            variant="h6"
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#e3e7d3",
              borderRadius: 1,
              borderEndEndRadius: 0,
              borderEndStartRadius: 0,
            }}
          >
            Welcome, {firstName} {lastName}! How are things at {propertyName}?
          </Typography>

          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Email Settings
              </Typography>
              <Typography variant="body1" gutterBottom>
                Current Email: {email}
              </Typography>
              <TextField
                label="Change Email"
                variant="outlined"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                color="primary"
                onClick={() => handleEmailSave(tempEmail)}
                sx={{ mt: 1 }}
              >
                Save Email
              </Button>
            </Grid2>

            <Grid2 xs={12} md={6} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Property Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                Current Property: {propertyName}
              </Typography>
              <TextField
                label="Set Property Name"
                variant="outlined"
                value={tempPropertyName}
                onChange={(e) => setTempPropertyName(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                color="primary"
                onClick={() => handlePropertyNameSave(tempPropertyName)}
                sx={{ mt: 1 }}
              >
                Save Property Name
              </Button>
            </Grid2>
          </Grid2>
          <DeleteAccountFlow />
        </Box>
      </Box>
    </Box>
  );
};

export default AccountSettings;
