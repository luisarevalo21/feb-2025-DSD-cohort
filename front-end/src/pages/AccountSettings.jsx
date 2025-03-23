import { useState } from 'react';
import { Box, Typography, TextField, Paper, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DeleteAccountFlow from '../components/DeleteAccountFlow';
import toast from 'react-hot-toast';

const AccountSettings = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [tempEmail, setTempEmail] = useState(email);
    const [propertyName, setPropertyName] = useState('Unnamed Property');
    const [tempPropertyName, setTempPropertyName] = useState(propertyName);
    const firstName = "John";
    const lastName = "Doe";

    const handleEmailSave = (e) => {
        setEmail(tempEmail);
        toast.success('Email updated successfully!');
    }

    const handlePropertyNameSave = (e) => {
        setPropertyName(tempPropertyName);
        toast.success('Property name updated successfully!');
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Account Settings
            </Typography>

            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant='h6'>
                    Welcome, {firstName} {lastName}! How are things at {propertyName}?
                </Typography>
            </Paper>

            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Email Settings
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Current Email: {email}
                        </Typography>
                        <TextField
                            label="Change Email"
                            variant="outlined"
                            value={tempEmail}
                            onChange={(e) => setTempEmail(e.target.value)}
                            fullWidth
                            sx={{ mt: 2 }}
                        />
                        <Button
                            cariant="contained"
                            color='primary'
                            onClick={() => handleEmailSave(tempEmail)}
                            sx={{ mt: 1 }}
                        >
                            Save Email
                        </Button>
                    </Paper>
                </Grid2>

                <Grid2 xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2}}>
                        <Typography variant='h6' gutterBottom>
                            Property Name
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Current Property: {propertyName}
                        </Typography>
                        <TextField
                            label="Set Property Name"
                            variant='outlined'
                            value={tempPropertyName}
                            onChange={(e) => setTempPropertyName(e.target.value)}
                            fullWidth
                            sx={{ mt: 2 }}
                        />
                        <Button
                            cariant="contained"
                            color='primary'
                            onClick={() => handlePropertyNameSave(tempPropertyName)}
                            sx={{ mt: 1 }}
                        >
                            Save Property Name
                        </Button>
                    </Paper>
                </Grid2>
            </Grid2>
            <DeleteAccountFlow />
        </Box>
    )
}

export default AccountSettings;