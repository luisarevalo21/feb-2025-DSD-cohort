import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateApartmentDetails } from "../../api/apartmentApi";

const Features = ({ apartmentData }) => {
  const { features, id } = apartmentData;
  const initialFeatures = features || [];

  const [isEditing, setIsEditing] = useState(false);
  const [localFeatures, setLocalFeatures] = useState(initialFeatures);
  const [backupFeatures, setBackupFeatures] = useState(initialFeatures);

  const handleEdit = () => {
    setIsEditing(true);
    setBackupFeatures(localFeatures);
  };

  const handleFeatureChange = (e) => {
    const lines = e.target.value.split("\n");
    setLocalFeatures(lines);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const response = await updateApartmentDetails(id, {
        features: localFeatures,
      });
      toast.success("Features updated successfully!");
    } catch (error) {
      toast.error("Failed to update features. Please try again.");
    }
  };

  const handleCancel = () => {
    setLocalFeatures(backupFeatures);
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      <Card sx={{ height: 350, textAlign: "center", border: 0.5 }}>
        <Typography
          className="text-center py-3 text-lg font-semibold"
          bgcolor={"#e3e7d3"}
        >
          Features
        </Typography>
        {!isEditing && (
          <Button variant="outlined" onClick={handleEdit}>
            Add/Remove Features <EditIcon />
          </Button>
        )}
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2>
            {isEditing ? (
              <>
                <TextField
                  label="Edit Features"
                  multiline
                  rows={6}
                  value={localFeatures.join("\n")}
                  onChange={handleFeatureChange}
                />
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {localFeatures.length > 0 && localFeatures[0] ? (
                  localFeatures.map((feature, index) => (
                    <Typography key={index} variant="body1">
                      {feature}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="h5">No features to display!</Typography>
                )}
              </>
            )}
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Features;
