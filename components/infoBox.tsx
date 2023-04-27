import { UserDto } from '@/lib/auth/user';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {
    user: UserDto;
};

export default function InfoBox({ user }: Props) {
    const isMobile = useIsMobile();
    return (
        <Box sx={{
            p: '2rem',
            width: isMobile ? '100%' : '1200px'
        }}>
            <Box sx={{
                display: isMobile ? 'block' : 'flex',
                gap: '5px',
                justifyContent: 'center',
            }}>
                <Typography variant='subtitle1'>Your email: </Typography>
                <Typography sx={{ fontWeight: '800' }}>{user.email}</Typography>
                <Box sx={{
                    flexGrow: 1,
                }} />
                <Typography sx={{
                    justifySelf: 'flex-end',
                }}>Your email is: confirmed</Typography>
            </Box>

        </Box>
    )
}
