import { UserDto } from '@/lib/auth/userType';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
type Props = {
  lastLogin: UserDto['lastLogin'];
  lastFailedLogin: UserDto['lastFailedLogin'];
};

export function LoginDetails({ lastLogin, lastFailedLogin }: Props) {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: isMobile ? 'block' : 'flex',
        flexDirection: 'column',
      }}
    >
      {lastLogin && (
        <>
          <Typography variant="h5" sx={{ mb: '10px' }}>
            Last login:{' '}
          </Typography>
          <DataRow text="Time:" value={formatDate(new Date(lastLogin?.timestamp))} />
          <DataRow text="Address IP:" value={lastLogin.ip} />
          <Divider sx={{ my: 1, mb: '20px' }} />
        </>
      )}

      {lastFailedLogin && (
        <>
          <Typography variant="h5" sx={{ mb: '10px' }}>
            Last failed login:{' '}
          </Typography>
          <DataRow text="Time:" value={formatDate(new Date(lastFailedLogin?.timestamp))} />
          <DataRow text="Address IP:" value={lastFailedLogin.ip} />
          <DataRow text="User agent:" value={lastFailedLogin.userAgent} />
        </>
      )}
    </Box>
  );
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
    timeZoneName: 'short',
  });
}

function DataRow(props: { text: string; value: string }) {
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
  );
}
