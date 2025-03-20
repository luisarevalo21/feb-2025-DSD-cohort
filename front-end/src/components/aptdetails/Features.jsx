import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const Features = ({ apartmentData }) => {
    const { features, id } = apartmentData;
    const initialFeatures = features || [];

    //state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [localFeatures, setLocalFeatures] = useState(initialFeatures);
    const [backupFeatures, setBackupFeatures] = useState(initialFeatures)

    const handleEdit = () => {
        setIsEditing(true);
        //save the current features as a backup in case the user hits the cancel button
        setBackupFeatures(localFeatures);
    };

    //handler for changing features. Will be edited as multiline text, with each line corresponding to a feature.
    const handleFeatureChange = (e) => {
        const lines = e.target.value.split("\n");
        setLocalFeatures(lines);
    }

    const handleSave = async () => {
        setIsEditing(false);
        
        //api call will go here
        console.log("Apartment id to be saved to:", id);
        console.log("Saving features to API:", localFeatures);
    }

    //Handler for cancel button so the features can be reverted
    const handleCancel = () => {
        //Use the backed up features state to revert local features to what they were before edit button was clicked
        setLocalFeatures(backupFeatures);
        setIsEditing(false);
    }

    return (
        <Box
          sx={{
            border: "3px solid #ccc",
            borderRadius: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            textAlign: "center"
          }}>
            <Box sx={{ justifyContent: "space-between" }}>
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    Features
                </Typography>
                {!isEditing && (
                    <Button variant="outlined" color="warning" onClick={handleEdit}>
                        Add/Remove Features <EditIcon />
                    </Button>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* conditional to show a multi line text field if editing, otherwise a list of features  */}
            {isEditing ? (
                <>
                    <TextField
                      label="Edit Features"
                      multiline
                      rows={14}
                      value={localFeatures.join("\n")}
                      onChange={handleFeatureChange}
                    />
                    <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
                        <Button variant="contained" color="success" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    {localFeatures.length > 0? (
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
        </Box>
    )


}

export default Features;