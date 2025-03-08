import React from 'react';
import { TextField, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../assets/logo.png';

const MainHeader = () => {
    return (
        //w-full for full width(tailwind)
        //px and py for horizontal and vertical padding
        <header className='w-full bg-gray-200 flex items-center justify-end px-4 py-2'>
            <div className='flex items-center space-x-4'>
                <TextField
                  variant='outlined'
                  size='small'
                  placeholder='Search...'
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: "8px"
                  }}
                />

                <IconButton>
                    <NotificationsIcon />
                </IconButton>

                <img
                  src={logo}
                  alt="Our site logo"
                  className='h-8'
                />
            </div>
        </header>
    );
};

export default MainHeader;