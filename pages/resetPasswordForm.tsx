import { getUserFromSession } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Alert, Box, Button, CircularProgress, Container, Link, Stack, TextField } from '@mui/material';

export default function ResetPasswordForm() {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const token = router.query.token;

  if (token == null || typeof token !== 'string') {
    router.replace(`/?${feedbackUrlParam('bad-request')}`);
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/resetPassword?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        router.push(`/login?${feedbackUrlParam('password-reset-success')}`);
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error);
      router.replace(`/?${feedbackUrlParam('bad-request')}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField label="Password" variant="outlined" type="password" name="password" required />
          <TextField label="Repeat Password" variant="outlined" type="password" name="rpassword" required />

          <Box sx={{ display: 'flex' }}>
            <Link href="/login" sx={{ flex: 1 }}>
              Go back to login
            </Link>
            <Button type="submit" variant="contained" color="primary">
              {isLoading && <CircularProgress size={'sm'} />}
              Reset Password
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
    //this page is only for users who are not logged in
    return {
      redirect: {
        destination: `/?${feedbackUrlParam('already-logged-in')}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
