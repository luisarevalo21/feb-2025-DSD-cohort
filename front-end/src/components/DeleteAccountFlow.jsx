import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteAdmin } from "../api/userApi";
import Spinner from "../components/Spinner";

const DeleteAccountFlow = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // get current user cached from the ensure auth component
  const user = queryClient.getQueryData(["user"]);

  const [step, setStep] = useState("initial");
  const [confirmationText, setConfirmationText] = useState("");

  const handleInputSubmit = () => {
    if (confirmationText === "I want to delete my account") {
      setStep("lastChance");
    } else {
      toast.error("Please type the exact phrase to confirm.");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => deleteAdmin(user.id),
    onSuccess: () => {
      localStorage.removeItem("isLogged");
      toast.success("Account deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again");
    },
  });

  const handleFinalConfirm = () => {
    mutate();
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      {step === "initial" && (
        <Button
          variant="contained"
          color="error"
          onClick={() => setStep("confirm")}
        >
          Delete Account
        </Button>
      )}
      {step === "confirm" && (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Are you sure?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setStep("input")}
            sx={{ mr: 1 }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setStep("initial")}>
            No
          </Button>
        </Box>
      )}
      {step === "input" && (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Please type &quot;I want to delete my account&quot; to confirm:
          </Typography>
          <TextField
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button variant="contained" color="error" onClick={handleInputSubmit}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: 2 }}
            onClick={() => setStep("initial")}
          >
            Cancel
          </Button>
        </Box>
      )}
      {step === "lastChance" && (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Last chance!
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleFinalConfirm}
          >
            DELETE
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default DeleteAccountFlow;
