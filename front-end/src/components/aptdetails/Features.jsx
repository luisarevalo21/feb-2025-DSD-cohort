import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid2,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { updateApartmentDetails } from "../../api/apartmentApi";
import toast from "react-hot-toast";
import React from "react";

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
      <Card sx={{ height: 400 }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#206129"}
        >
          Features
        </Typography>
        {!isEditing && (
          <Button variant="outlined" color="warning" onClick={handleEdit}>
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
                    <Typography key={index} variant="h6">
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

//   return (
//     <Box
//       sx={{
//         border: "5px ridge rgb(157, 127, 246)",
//         borderRadius: 2.5,
//         p: 2,
//         display: "flex",
//         flexDirection: "column",
//         flex: 1,
//         textAlign: "center",
//         overflow: "hidden",
//       }}
//     >
//       <Box sx={{ justifyContent: "space-between" }}>
//         <Typography variant="h2" sx={{ fontWeight: "bold" }}>
//           Features
//         </Typography>
//         {!isEditing && (
//           <Button variant="outlined" color="warning" onClick={handleEdit}>
//             Add/Remove Features <EditIcon />
//           </Button>
//         )}
//       </Box>

//       <Divider sx={{ bgcolor: "#ede7f6", my: 2 }} />

//       {isEditing ? (
//         <>
//           <TextField
//             label="Edit Features"
//             multiline
//             rows={14}
//             value={localFeatures.join("\n")}
//             onChange={handleFeatureChange}
//           />
//           <Box
//             sx={{
//               mt: 2,
//               display: "flex",
//               gap: 2,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Button variant="contained" color="success" onClick={handleSave}>
//               Save
//             </Button>
//             <Button variant="outlined" color="error" onClick={handleCancel}>
//               Cancel
//             </Button>
//           </Box>
//         </>
//       ) : (
//         <>
//           {localFeatures.length > 0 && localFeatures[0] ? (
//             localFeatures.map((feature, index) => (
//               <Typography key={index} variant="h6">
//                 {feature}
//               </Typography>
//             ))
//           ) : (
//             <Typography variant="h5">No features to display!</Typography>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

export default Features;
