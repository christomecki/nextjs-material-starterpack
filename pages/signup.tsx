import { useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField } from '@mui/material';
import { PasswordStrengthMeter } from '@/components/passValidator';
import { FormPageWrapper } from '@/components/formPageWrapper';
import { useForm } from 'react-hook-form';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { fieldRegisterWrapper } from '@/lib/material/fieldRegisterWrapper';
import passwordValidation, { isValidationValid } from '@/lib/passValidation/passwordValidaton';

type FormData = {
  email: string;
  password: string;
  rpassword: string;
};

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({});

  const onSubmit = handleSubmit(async (data) => {
    if (errorMsg) setErrorMsg('');

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/login');
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <FormPageWrapper title={'Sign up'}>
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email address"
            variant="outlined"
            {...field('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              validate: (value) => isValidEmailAddress(value) || 'Email is not valid',
            })}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...field('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              validate: (value) => isValidationValid(passwordValidation(value)) || 'Password is not strong enough',
            })}
          />
          <TextField
            label="Repeat Password"
            variant="outlined"
            type="password"
            {...field('rpassword', {
              required: {
                value: true,
                message: 'Repeated password is required',
              },
              validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
            })}
          />

          <PasswordStrengthMeter validation={passwordValidation(watch('password', ''))} />
          <Box sx={{ display: 'flex' }}>
            <Link href="/login" sx={{ flex: 1 }}>
              I already have an account
            </Link>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={'sm'} />}
              Signup
            </Button>
          </Box>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </Box>
    </FormPageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUserFromSession(req);
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
