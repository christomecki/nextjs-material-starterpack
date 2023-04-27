import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Link from '@mui/material/Link';

export default function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    try {
      setIsLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        }),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Email" variant="outlined" type="text" name="email" required />
          <TextField label="Password" variant="outlined" type="password" name="password" required />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button href="forgotPassword">Forgot password?</Button>

            <Button type="submit" variant="contained" color="success" disabled={isLoading}>
              {isLoading && <CircularProgress size={'sm'} />}
              Login
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, boxShadow: 1, px: 2, py: 1, borderRadius: 1 }}>
            <Typography sx={{ my: 'auto' }}>New to our platform?</Typography>
            <Button variant="outlined" href="/signup">
              Create an account
            </Button>
          </Box>

          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </form>
    </Container>
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
