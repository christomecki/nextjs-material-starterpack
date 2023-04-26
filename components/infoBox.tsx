import { UserDto } from '@/lib/auth/user';
import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
    user: UserDto;
};

export default function InfoBox({ user }: Props) {
    return (
        <Box sx={{
            p: '2rem',
        }}>
            <Typography>Your email: {user.email}</Typography>
            <Typography>Your email is: confirmed</Typography>
        </Box>
    )
}
