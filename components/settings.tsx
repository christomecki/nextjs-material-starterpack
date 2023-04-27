import { UserDto } from '@/lib/auth/user';
import React from 'react'
import { Box, Button, styled } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import DeleteAccount from './deleteAccount';
import ChangePasswordForm from './changePasswordForm';

type Props = {
    user: UserDto;
};

const StyledButton = styled(Button)({
    width: '200px',
    color: 'white',
    '@media (max-width: 600px)': {
        width: '100%',
    },
})

export default function Settings({ user }: Props) {
    const [showChangePasswordForm, setShowChangePasswordForm] = React.useState<boolean>(false);
    const [showDeleteAccountOption, setShowDeleteAccountOption] = React.useState<boolean>(false);

    return (
        <Box sx={{
            p: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: 'fit-content',
        }} >
            <StyledButton variant='outlined' onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}>Change password</StyledButton>
            <Collapse in={showChangePasswordForm}><ChangePasswordForm user={user} /></Collapse>
            <StyledButton variant='outlined' onClick={() => setShowDeleteAccountOption(!showDeleteAccountOption)}>Delete Account</StyledButton>
            <Collapse in={showDeleteAccountOption}><DeleteAccount /></Collapse>
        </Box >
    )
}



