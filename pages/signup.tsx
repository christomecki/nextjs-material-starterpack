import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Alert, Box, Button, CircularProgress, Container, Link, Stack, TextField } from '@mui/material';
import PassValidator from '@/components/passValidator';

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [validationDone, setValidationDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }
    if (validationDone) {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMsg('Password does not meet the requirements');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Email address" variant="outlined" type="text" name="email" required />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField label="Repeat Password" variant="outlined" type="password" name="rpassword" required />

          <PassValidator password={password} passwordCorrect={setValidationDone}></PassValidator>
          <Box sx={{ display: 'flex' }}>
            <Link href="/login" sx={{ flex: 1 }}>
              I already have an account
            </Link>
            <Button type="submit" variant="contained" color="primary">
              {isLoading && <CircularProgress size={'sm'} />}
              Signup
            </Button>
          </Box>
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Stack>
      </Box>
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
