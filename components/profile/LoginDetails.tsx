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
            <Typography variant="h5" sx={{ mb: '10px' }}>Last login: </Typography>
            <DataRow text="Time:" value={lastLoginFormattedDate} />
            <DataRow text="Address IP:" value={user.lastLogin.ip} />
            <Divider sx={{ my: 1, mb: '20px' }} />
            <Typography variant="h5" sx={{ mb: '10px' }}>Last failed login: </Typography>
            <DataRow text="Time:" value={lastFailedLoginFormattedDate} />
            <DataRow text="Address IP:" value={user.lastFailedLogin.ip} />
            <DataRow text="User agent:" value={user.lastFailedLogin.userAgent} />
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

function DataRow(props: { text: string, value: string }) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '20px',
                mb: '5px',
            }}
        >
            <Typography sx={{ fontWeight: '800', color: 'text.secondary', minWidth: '100px' }}>{props.text}</Typography>
            <Typography>{props.value}</Typography>
        </Box>
    )
}