import { UserDto } from '@/lib/auth/user';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  user: UserDto;
};

export default function ProfileInfo({ user }: Props) {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Typography variant="h4">Your profile details</Typography>
      <Box
        sx={{
          display: isMobile ? 'block' : 'flex',
          gap: '5px',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1">E-mail: </Typography>
        <Typography sx={{ fontWeight: '800' }}>{user.email}</Typography>
        <Box
          sx={{
            flexGrow: 1,
          }}
        />
        <Typography
          sx={(theme) => ({
            justifySelf: 'flex-end',
            color: user.emailConfirmed ? theme.palette.success.main : theme.palette.error.main,
          })}
        >
          {user.emailConfirmed ? ' Your email is confirmed' : ' Your email is not confirmed. Please check your email for confirmation link.'}
        </Typography>
      </Box>
    </Box>
  );
}
