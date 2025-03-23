//A little Easter egg/commentary component on how easily you can delete your account in most services
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from 'react';
import toast from "react-hot-toast";

const DeleteAccountFlow = () => {
    //initial > confirm > input > last chance > final
    const [step, setStep] = useState('initial');
    const [confirmationText, setConfirmationText] = useState('');

    const handleDeleteClick = () => {
        setStep('confirm');
    }

    const handleConfirmYes = () => {
        setStep('input');
    }

    const handleConfirmNo = () => {
        setStep('initial');
    }

    const handleInputSubmit = () => {
        if (confirmationText === 'I want to delete my account') {
            setStep('lastChance');
        } else {
            toast.error('Please type the exact phrase to confirm.');
        }
    }

    const handleFinalConfirm = () => {
        setStep('final');
    }

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 2}}>
            {step === 'initial' && (
                <Button variant="contained" color="error" onClick={handleDeleteClick}>
                    Delete Account
                </Button>
            )}
            {step === 'confirm' && (
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Are you sure?
                    </Typography>
                    <Button variant="contained" color="error" onClick={handleConfirmYes} sx={{ mr: 1 }}>
                        Yes
                    </Button>
                    <Button variant ="outlined" onClick={handleConfirmNo}>
                        No
                    </Button>
                </Box>
            )}
            {step === 'input' && (
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Please type "I want to delete my account" to confirm:
                    </Typography>
                    <TextField
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 1 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleInputSubmit}>
                        Submit
                    </Button>
                </Box>
            )}
            {step === 'lastChance' && (
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Last chance!
                    </Typography>
                    <Button variant="contained" color="warning" onClick={handleFinalConfirm}>
                        Accept
                    </Button>
                </Box>
            )}
            {step === 'final' && (
                <Typography variant="body1" color="textSecondary">
                    for your own protection, you can't delete your account!
                </Typography>
            )}
        </Paper>
    )



}

export default DeleteAccountFlow;