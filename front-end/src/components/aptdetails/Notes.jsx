import { useState } from "react";
import { Box, Typography, Button, TextField, Divider } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import { updateApartmentDetails } from "../../api/apartmentApi";

const Notes = ({ apartmentData }) => {
    const { notes, id } = apartmentData;
    const initialNotes = notes || "";
    
    //state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [localNotes, setLocalNotes] = useState(initialNotes)
    const [backupNotes, setBackupNotes] = useState(initialNotes);

    const handleEdit = () => {
        setIsEditing(true);
        setBackupNotes(localNotes);
    }

    const handleNotesChange = (e) => {
        setLocalNotes(e.target.value);
    }


    const handleSave = async () => {
        setIsEditing(false);
        //api call will go here
        console.log("Apartment id to be saved to:", id);
        console.log("Saving notes to API:",  id, localNotes);
        try {
            const response = await updateApartmentDetails(id, { notes: localNotes });
            console.log("Updated apartment with new notes response:", response);
            //give a visual confirmation to the user that the notes were updated
            alert("Notes updated successfully!");
        } catch (error) {
            console.error("Error updating apartment notes:", error);
            alert("Failed to update notes. Please try again.");
        }
    }

    const handleCancel = () => {
        setLocalNotes(backupNotes);
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
            overflow: "hidden"
          }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h2" sx={{ fontWeight: "bold"}}>
                    Notes
                </Typography>
                {!isEditing && (
                    <Button variant="outlined" color="primary" onClick={handleEdit}>
                        Modify Notes <EditIcon />
                    </Button>
                )}
            </Box>
            <Divider sx={{my: 2}}/>
            {isEditing ? (
                <>
                    <TextField
                        label="Edit Notes"
                        multiline
                        rows={14}
                        value={localNotes}
                        onChange={handleNotesChange}
                    />
                    <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
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
                    {localNotes ? (
                        <Typography variant="body1" sx={{whiteSpace: "pre-line"}}>{localNotes}</Typography>
                    ) : (
                        <Typography variant="h5">No notes to display.</Typography>
                    )}
                </>
            )}
        </Box>
    )
}

export default Notes;