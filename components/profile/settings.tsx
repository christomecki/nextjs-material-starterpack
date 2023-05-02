import { UserDto } from '@/lib/auth/user';
import React from 'react';
import { Box, Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DeleteAccount from '../deleteAccount';
import ChangePasswordForm from '../changePasswordForm';

type Props = {
  user: UserDto;
};

export default function Settings({ user }: Props) {
  const [showChangePasswordForm, setShowChangePasswordForm] = React.useState<boolean>(false);
  const [showDeleteAccountOption, setShowDeleteAccountOption] = React.useState<boolean>(false);

  return (
    <Box
      sx={{
        p: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: 'fit-content',
      }}
    >
      <Button variant="outlined" onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}>
        Change password
      </Button>
      <Collapse in={showChangePasswordForm}>
        <ChangePasswordForm user={user} />
      </Collapse>
      <Button variant="outlined" onClick={() => setShowDeleteAccountOption(!showDeleteAccountOption)}>
        Delete Account
      </Button>
      <Collapse in={showDeleteAccountOption}>
        <DeleteAccount />
      </Collapse>
    </Box>
  );
}
