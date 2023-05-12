import { getUserFromSession } from '@/lib/auth/user';
import { feedbackUrlParam } from '@/lib/feedback';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Button, CircularProgress, Link, Stack, TextField } from '@mui/material';
import { FormPageWrapper } from '@/components/formPageWrapper';
import { PasswordStrengthMeter } from '@/components/passValidator';
import { verifyToken } from '@/lib/auth/resetPassword';
import { useForm } from 'react-hook-form';
import { fieldRegisterWrapper } from '@/lib/material/fieldRegisterWrapper';
import { passwordRegisterOptions, repeatedPasswordRegisterOptions } from '@/components/passwordRegisterOptions';
import passwordValidation from '@/lib/passValidation/passwordValidaton';

type FormData = {
  password: string;
  rpassword: string;
};

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({});

  const router = useRouter();
  const token = router.query.token;

  if (token == null || typeof token !== 'string') {
    router.replace(`/?${feedbackUrlParam('bad-request')}`);
    return null;
  }

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      password: data.password
    };

    try {
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
    } 
  });

  const field = fieldRegisterWrapper(register, errors);

  return (
    <FormPageWrapper title="Reset Password">
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
        <TextField label="Password" variant="outlined" type="password" {...field('password', passwordRegisterOptions())} />
          <TextField label="Repeat Password" variant="outlined" type="password" {...field('rpassword', repeatedPasswordRegisterOptions())} />

          <PasswordStrengthMeter validation={passwordValidation(watch('password', ''))} />

          <Box sx={{ display: 'flex' }}>
            <Link href="/login" sx={{ flex: 1 }}>
              Go back to login
            </Link>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={'sm'} />}
              Reset Password
            </Button>
          </Box>
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
