import { UserDto } from '@/lib/auth/userType';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { ResendConfirmationLinkButton } from './ResendConfirmationLinkButton';

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
      <Divider sx={{ my: 1 }} />
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
            fontSize: '0.8rem',
            color: user.emailConfirmed ? theme.palette.success.main : theme.palette.error.main,
          })}
        >
          {user.emailConfirmed ? (
            ' Your email is confirmed'
          ) : (
            <Box data-cy="notconfirmed" sx={{ textAlign: 'right', marginTop: { xs: 5, md: 0 } }}>
              Your email is not confirmed.
              <br />
              Please check your email for confirmation link or ...
              <br />
              <ResendConfirmationLinkButton />
            </Box>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
