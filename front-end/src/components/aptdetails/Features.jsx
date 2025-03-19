import { Box, Typography, Button, TextField, Divider } from "@mui/material";

const Features = ({ apartmentData }) => {
    const { features } = apartmentData;
    const initialFeatures = features || [];

    //state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [localFeatures, setLocalFeatures] = useState(initialFeatures);

    //handler for edit features button
    const handleEdit = () => {
        setIsEditing(true);
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
        console.log("Saving features to API:", localFeatures);
    }

    return (
        <Box
          sx={{
            border: "3px solid #ccc",
            borderRadius: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
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
        </Box>
    )


}