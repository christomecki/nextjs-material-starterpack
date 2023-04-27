import React, { FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { getUserFromSession } from '@/lib/auth/user';
import { Container, Stack, TextField, CircularProgress, Button } from '@mui/material';
import Router from 'next/router';
import { feedbackUrlParam } from '@/lib/feedback';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: e.currentTarget.email.value,
        }),
      });
      if (res.status === 200) {
        Router.push(`/?${feedbackUrlParam('password-reset-email')}`);
      } else {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error);
      Router.push(`/?${feedbackUrlParam('unexpected-error')}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField disabled={isLoading} label="Email" variant="outlined" type="text" name="email" required />
          <Button type="submit" variant="contained" color="success" disabled={isLoading}>
            {isLoading && <CircularProgress size={'sm'} />}
            Send password reset email
          </Button>
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
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
