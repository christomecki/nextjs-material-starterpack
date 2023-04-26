import { UserDto } from '@/lib/auth/user';
import React, { FormEvent } from 'react'
import { Box, Button, TextField, styled } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useIsMobile } from '@/lib/material/useIsMobile';
import passwordValidation from '@/lib/passValidation/passwordValidaton';
import PassValidator from './passValidator';

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

    return (
        <Box sx={{
            p: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minWidth: '250px',

        }} >
            <StyledButton variant='outlined' onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}>Change password</StyledButton>
            <Collapse in={showChangePasswordForm}><ChangePasswordForm user={user} /></Collapse>
            <StyledButton variant='outlined'>Delete Account</StyledButton>
        </Box >
    )
}

function ChangePasswordForm({ user }: Props) {
    const [password, setPassword] = React.useState<string>('');
    const [passwordCorrect, setPasswordCorrect] = React.useState<boolean>(false);
    const isMobile = useIsMobile();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            password: e.currentTarget.password.value,
            oldpassword: e.currentTarget.oldpassword.value,
            email: user.email,
        };
        console.log('body: ', body);

        try {
            if (body.password !== e.currentTarget.rpassword.value) {
                console.log('Repated password is not the same');
            } else if (!passwordCorrect) {
                console.log('password not valid');
            } else {
                console.log('password valid');
                const res = await fetch('api/changePassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (res.status !== 200) {
                    console.log('password not changed');
                } else {
                    console.log('password changed');
                }

            }
        }
        catch (error: any) {
            console.error('An unexpected error happened occurred:', error);
        }

    }
    return (
        <Box sx={{
            display: isMobile ? 'block' : 'flex',
            gap: '1rem',

        }}>
            <Box component='form' onSubmit={handleSubmit} sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: '5px',
                p: '1rem',
                gap: '1rem',
            })}>
                <TextField
                    label="Old Password"
                    variant="outlined" type="password"
                    name="oldpassword"
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }} />
                <TextField
                    label="New Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }}
                ></TextField>
                <TextField
                    label="Repeat Password"
                    variant="outlined" type="password"
                    name="rpassword"
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }} />
                <Button type='submit' variant='contained' sx={{
                    width: isMobile ? '100%' : '100px',
                }}>
                    Submit
                </Button>
            </Box>
            <PassValidator password={password} passwordCorrect={setPasswordCorrect}></PassValidator>
        </Box>
    )
}

