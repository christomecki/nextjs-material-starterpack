import { useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Link, Stack, TextField } from '@mui/material';
import { PasswordStrengthMeter } from '@/components/passValidator';
import { FormPageWrapper } from '@/components/FormPageWrapper';
import { useForm } from 'react-hook-form';
import { isValidEmailAddress } from '@/lib/auth/isValidEmailAddress';
import { fieldRegisterWrapper } from '@/lib/material/fieldRegisterWrapper';
import passwordValidation from '@/lib/auth/passwordValidaton';

type FormData = {
  email: string;
  password: string;
  rpassword: string;
};

import { feedbackUrlParam } from '@/lib/feedback';
import { passwordRegisterOptions, repeatedPasswordRegisterOptions } from '@/components/passwordRegisterOptions';

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
        Router.push(`/login?${feedbackUrlParam('account-created')}`);
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
          <TextField label="Password" variant="outlined" type="password" {...field('password', passwordRegisterOptions())} />
          <TextField label="Repeat Password" variant="outlined" type="password" {...field('rpassword', repeatedPasswordRegisterOptions())} />

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
