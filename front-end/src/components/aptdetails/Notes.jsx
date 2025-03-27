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

const Notes = ({ apartmentData }) => {
  const { notes, id } = apartmentData;
  const initialNotes = notes || "";

  const [isEditing, setIsEditing] = useState(false);
  const [localNotes, setLocalNotes] = useState(initialNotes);
  const [backupNotes, setBackupNotes] = useState(initialNotes);

  const handleEdit = () => {
    setIsEditing(true);
    setBackupNotes(localNotes);
  };

  const handleNotesChange = (e) => {
    setLocalNotes(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await updateApartmentDetails(id, { notes: localNotes });
      toast.success("Notes updated successfully!");
    } catch (error) {
      toast.error("Failed to update notes. Please try again.");
    }
  };

  const handleCancel = () => {
    setLocalNotes(backupNotes);
    setIsEditing(false);
  };
  return (
    <React.Fragment>
      <Card sx={{ height: 350, textAlign: "center", border: 0.5 }}>
        <Typography
          className="text-center py-3 text-lg font-semibold"
          bgcolor={"#e3e7d3"}
        >
          Notes
        </Typography>
        {!isEditing && (
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Modify Notes <EditIcon />
          </Button>
        )}
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2>
            {isEditing ? (
              <>
                <TextField
                  label="Edit Notes"
                  multiline
                  rows={6}
                  value={localNotes}
                  onChange={handleNotesChange}
                />
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    gap: 2,
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
                {localNotes ? (
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {localNotes}
                  </Typography>
                ) : (
                  <Typography variant="h5">No notes to display.</Typography>
                )}
              </>
            )}
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Notes;
