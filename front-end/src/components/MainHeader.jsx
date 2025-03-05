import React from 'react';
//Material UI imports
import { TextField, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import logo(we don't have one yet so it's just a screenshot that says "logo")
import logo from '../assets/logo.png';

const MainHeader = () => {
    return (
        //<header> tag, main container for the bar
        //w-full for full width(tailwind)
        //flex items-center justify-end uses flexbox, centers items vertically, and aligns them to the right
        //px and py for horizontal and vertical padding
        <header className='w-full bg-gray-200 flex items-center justify-end px-4 py-2'>
            {/* Wrapper for the elements which will be grouped on the right side of the bar */}
            <div className='flex items-center space-x-4'>
                {/* Non functional search using MUI TextField */}
                <TextField
                  variant='outlined'
                  size='small'
                  placeholder='Search...'
                />

                {/* Non-functional Notification bell icon  */}
                <IconButton>
                    <NotificationsIcon />
                </IconButton>

                {/* The right-most item is the site logo(dummy logo for now ) */}
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