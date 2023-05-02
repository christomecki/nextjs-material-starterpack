import { getUserFromSession } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Alert, Box, Button, CircularProgress, Container, Link, Stack, TextField } from '@mui/material';
import { FormPageWrapper } from '@/components/formPageWrapper';
import PassValidator from '@/components/passValidator';
import { verifyToken } from '@/lib/auth/resetPassword';

export default function ResetPasswordForm() {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [validationDone, setValidationDone] = React.useState(false);

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

    if (validationDone) {
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
    } else {
      setErrorMsg('Password does not meet the requirements');
    }
  };

  return (
    <FormPageWrapper title="Reset Password">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField label="Repeat Password" variant="outlined" type="password" name="rpassword" required />

          <PassValidator password={password} passwordCorrect={setValidationDone} />

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
    </FormPageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
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

  const checkToken = async (t: string) => {
    try {
      await verifyToken(t);
      return true;
    } catch {
      return false;
    }
  };

  const token = query.token;
  if (token == null || typeof token !== 'string' || !(await checkToken(token))) {
    return {
      redirect: {
        destination: `/?${feedbackUrlParam('bad-request')}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
