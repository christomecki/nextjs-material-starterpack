import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UserDto, getUserFromSession } from '@/lib/auth/user';
import { GetServerSideProps } from 'next/types';

type Props = {
  user: UserDto | null;
};

export default function About() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" href="/">
            Go to the home page
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const user = await getUserFromSession(req);
  return {
    props: { user: user ?? null },
  };
};
