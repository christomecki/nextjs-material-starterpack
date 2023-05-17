import React, { useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { FormPageWrapper } from '@/components/FormPageWrapper';
import { useForm } from 'react-hook-form';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { fieldRegisterWrapper } from '@/lib/material/fieldRegisterWrapper';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({});

  const onSubmit = handleSubmit(async (data) => {
    if (errorMsg) setErrorMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg('Invalid credentials');
    }
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <FormPageWrapper title="Sign in">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
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
            })}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link style={{ textDecoration: 'none' }} href="forgotPassword">
              Forgot password?
            </Link>

            <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={'sm'} />}
              Login
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, px: 2, py: 1, borderRadius: 1 }}>
            <Typography sx={{ my: 'auto' }}>New to our platform?</Typography>
            <Link style={{ textDecoration: 'none' }} href="/signup">
              Create an account!
            </Link>
          </Box>

          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </form>
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
