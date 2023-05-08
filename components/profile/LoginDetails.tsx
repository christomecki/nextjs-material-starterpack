import { UserDto } from '@/lib/auth/user';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react'
type Props = {
    user: UserDto;
};

export function LoginDetails({ user }: Props) {
    const isMobile = useIsMobile();
    const lastLoginFormattedDate = formatDate(new Date(user.lastLogin?.timestamp));
    const lastFailedLoginFormattedDate = formatDate(new Date(user.lastFailedLogin?.timestamp));
    return (
        <Box
            sx={{
                display: isMobile ? 'block' : 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h6">Last login: </Typography>
            <Typography >Time: {lastLoginFormattedDate}</Typography>
            <Typography >Address IP: {user.lastLogin.ip}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6">Last failed login: </Typography>
            <Typography >Time: {lastFailedLoginFormattedDate}</Typography>
            <Typography >Address IP: {user.lastFailedLogin.ip}</Typography>
            <Typography >User agent: {user.lastFailedLogin.userAgent}</Typography>
        </Box>
    )
}

function formatDate(date: Date) {
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
}