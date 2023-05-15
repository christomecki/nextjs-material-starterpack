import { UserDto } from '@/lib/auth/user';
import React from 'react';
import { Alert, Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useIsMobile } from '@/lib/material/useIsMobile';
import { PasswordStrengthMeter } from './PassValidator';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { fieldRegisterWrapper } from '@/lib/material/fieldRegisterWrapper';
import passwordValidation, { isValidationValid } from '@/lib/auth/passwordValidaton';
import { passwordRegisterOptions, repeatedPasswordRegisterOptions } from '../lib/auth/passwordRegisterOptions';
type Props = {
  user: UserDto;
};

type FormData = {
  password: string;
  rpassword: string;
  oldpassword: string;
};

export default function ChangePasswordForm({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({});

  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const isMobile = useIsMobile();

  const onSubmit = handleSubmit(async (data) => {
    if (errorMsg) setErrorMsg('');

    const body = {
      password: data.password,
      oldpassword: data.oldpassword,
      email: user.email,
    };

    try {
      const res = await fetch('api/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        enqueueSnackbar('Password changed', { variant: 'success' });
        reset();
      } else {
        throw new Error("Couldn't change password");
      }
    } catch (error: any) {
      console.error('An error occurred:', error);
      setErrorMsg(error.message);
    }
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={12} md={6}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Current password"
              variant="outlined"
              type="password"
              {...field('oldpassword', {
                required: {
                  value: true,
                  message: 'Your current password is required',
                },
              })}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              {...field(
                'password',
                passwordRegisterOptions({
                  validate: (value, formValues) => {
                    if (!isValidationValid(passwordValidation(value))) {
                      return 'Password is not strong enough';
                    }
                    if (value === formValues.oldpassword) {
                      return 'New password cannot be the same as old password';
                    }
                    return true;
                  },
                })
              )}
            ></TextField>
            <TextField label="Repeat Password" variant="outlined" type="password" {...field('rpassword', repeatedPasswordRegisterOptions())} />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: isMobile ? '100%' : 'max-content',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={'sm'} />}
              Submit
            </Button>
            {errorMsg && (
              <Collapse in={errorMsg !== ''} onClick={() => setErrorMsg('')}>
                <Alert severity="error">{errorMsg}</Alert>
              </Collapse>
            )}
          </Stack>
        </form>
      </Grid>

      <Grid item xs={12} md={6}>
        <PasswordStrengthMeter validation={passwordValidation(watch('password', ''))} />
      </Grid>
    </Grid>
  );
}
