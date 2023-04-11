import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
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

          <Box sx={{ display: 'flex' }}>
            <Link href="/signup" sx={{ flex: 1 }}>
              I dont have an account
            </Link>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading && <CircularProgress size={'sm'} />}
              Login
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
