import { UserDto } from '@/lib/auth/user';
import React, { FormEvent } from 'react'
import { Alert, Box, Button, TextField } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useIsMobile } from '@/lib/material/useIsMobile';
import PassValidator from './passValidator';

type Props = {
    user: UserDto;
};

type Form = {
    password: string;
    rpassword: string;
    oldpassword: string;
}

export default function ChangePasswordForm({ user }: Props) {
    const [passwordForm, setPasswordForm] = React.useState<Form>({ password: '', rpassword: '', oldpassword: '' });
    const [passwordCorrect, setPasswordCorrect] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>('');
    const [successMsg, setSuccessMsg] = React.useState<string>('');
    const isMobile = useIsMobile();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        const body = {
            password: e.currentTarget.password.value,
            oldpassword: e.currentTarget.oldpassword.value,
            email: user.email,
        };
        console.log('body: ', body);

        try {
            if (body.password !== e.currentTarget.rpassword.value) {
                setErrorMsg('The passwords do not match')
            } else if (!passwordCorrect) {
                setErrorMsg('Password not valid');
            } else if (body.password === body.oldpassword) {
                setErrorMsg('New password cannot be the same as the old one');
            } else {
                const res = await fetch('api/changePassword', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (res.status !== 200) {
                    console.log('password not changed');
                } else {
                    setSuccessMsg('Password changed successfully');
                    setPasswordForm({ password: '', rpassword: '', oldpassword: '' });
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
                    variant="outlined"
                    type="password"
                    name="oldpassword"
                    value={passwordForm.oldpassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldpassword: e.target.value })}
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }} />
                <TextField
                    label="New Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }}
                ></TextField>
                <TextField
                    label="Repeat Password"
                    variant="outlined"
                    type="password"
                    name="rpassword"
                    value={passwordForm.rpassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, rpassword: e.target.value })}
                    required
                    sx={{ width: isMobile ? '100%' : '300px' }} />
                <Button type='submit' variant='contained' sx={{
                    width: isMobile ? '100%' : '100px',
                }}>
                    Submit
                </Button>
                {errorMsg
                    ? <Collapse in={errorMsg !== ""} onClick={() => setErrorMsg('')}><Alert severity='error'>{errorMsg}</Alert></Collapse>
                    : <Collapse in={successMsg !== ""} onClick={() => setSuccessMsg('')}><Alert severity='success'>{successMsg}</Alert></Collapse>}
            </Box>
            <PassValidator password={passwordForm.password} passwordCorrect={setPasswordCorrect} ></PassValidator>
        </Box>
    )
}
