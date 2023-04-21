import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GetServerSideProps } from 'next';
import { getUserFromSession, UserDto } from '@/lib/auth/user';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

type Props = {
  user: UserDto | null;
};

export default function Home({ user }: Props) {
  return (
    <>
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
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Button onClick={() => alert('hello')}>Click</Button>
      </Box>

      <h1>Passport.js Example</h1>

      <p>Steps to test the example:</p>

      <ol>
        <li>Click Login and enter a email and password.</li>
        <li>Youll be redirected to Home. Click on Profile, notice how your session is being used through a token stored in a cookie.</li>
        <li>Click Logout and try to go to Profile again. Youll get redirected to Login.</li>
      </ol>

      <p> Need more content to tests so...</p>

      <h3>Pippin`s song </h3>
      <p> Home is behind the world ahead.</p>
      <p> And there are many paths to tread. </p>
      <p> Through shadow to the edge of night, </p>
      <p> Until the stars are all alight... </p>
      <p> Mist and hadow, </p>
      <p> Cloud and shade, </p>
      <p> All shall fade... </p>
      <p> All shall fade...</p>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const user = await getUserFromSession(req);
  return {
    props: { user: user ?? null },
  };
};
