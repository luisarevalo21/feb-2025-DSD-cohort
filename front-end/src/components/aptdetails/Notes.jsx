import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { updateApartmentDetails } from "../../api/apartmentApi";
import toast from "react-hot-toast";
import React from "react";

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
      <Card sx={{ height: 400 }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#206129"}
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
            <TextField
              label="Edit Notes"
              multiline
              rows={6}
              value={localNotes}
              onChange={handleNotesChange}
            />
            <Box
              sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
            <>
              {localNotes ? (
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {localNotes}
                </Typography>
              ) : (
                <Typography variant="h5">No notes to display.</Typography>
              )}
            </>
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );

  // return (
  //   <Box
  //     sx={{
  //       border: "5px ridge rgb(157, 127, 246)",
  //       borderRadius: 2.5,
  //       p: 2,
  //       display: "flex",
  //       flexDirection: "column",
  //       flex: 1,
  //       overflow: "hidden",
  //     }}
  //   >
  //     <Box sx={{ textAlign: "center" }}>
  //       <Typography variant="h2" sx={{ fontWeight: "bold" }}>
  //         Notes
  //       </Typography>
  //       {!isEditing && (
  //         <Button variant="outlined" color="primary" onClick={handleEdit}>
  //           Modify Notes <EditIcon />
  //         </Button>
  //       )}
  //     </Box>
  //     <Divider sx={{ my: 2, bgcolor: "#ede7f6" }} />
  //     {isEditing ? (
  //       <>
  //         <TextField
  //           label="Edit Notes"
  //           multiline
  //           rows={14}
  //           value={localNotes}
  //           onChange={handleNotesChange}
  //         />
  //         <Box
  //           sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}
  //         >
  //           <Button variant="contained" color="success" onClick={handleSave}>
  //             Save
  //           </Button>
  //           <Button variant="outlined" color="error" onClick={handleCancel}>
  //             Cancel
  //           </Button>
  //         </Box>
  //       </>
  //     ) : (
  //       <>
  //         {localNotes ? (
  //           <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
  //             {localNotes}
  //           </Typography>
  //         ) : (
  //           <Typography variant="h5">No notes to display.</Typography>
  //         )}
  //       </>
  //     )}
  //   </Box>
  // );
};

export default Notes;
