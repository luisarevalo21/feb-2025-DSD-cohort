import { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DeleteAccountFlow from '../components/DeleteAccountFlow';

const AccountSettings = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [propertyName, setPropertyName] = useState('Unnamed Property');
    const firstName = "John";
    const lastName = "Doe";

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Account Settings
            </Typography>

            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant='h6'>
                    Welcome, {firstName} {lastName}!
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
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
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                            fullWidth
                        />
                    </Paper>
                </Grid2>
            </Grid2>
            <DeleteAccountFlow />
        </Box>
    )
}

export default AccountSettings;