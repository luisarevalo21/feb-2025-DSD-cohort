import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import { useState } from 'react';

const Features = ({ apartmentData }) => {
    const { features, id } = apartmentData;
    const initialFeatures = features || [];

    //state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [localFeatures, setLocalFeatures] = useState(initialFeatures);
    const [backupFeatures, setBackupFeatures] = useState(initialFeatures)

    //handler for edit features button
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

    //Handler for save button
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
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                    Features
                </Typography>
                {!isEditing && (
                    <Button variant="outlined" onClick={handleEdit}>
                        Modify Features
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
                    <Box sx={{ mt: 2, display: "flex", gap: 2}}>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    {localFeatures.length > 0? (
                        localFeatures.map((feature, index) => (
                            <Typography key={index} variant="body1">
                                {feature}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body">No features to display!</Typography>
                    )}
                </>
            )}
        </Box>
    )


}

export default Features;