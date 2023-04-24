import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GetServerSideProps } from 'next';
import { getUserFromSession, UserDto } from '@/lib/auth/user';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { FOOTER_HEIGHT } from '@/components/footer';
import indexImage from '@/public/sea.jpg';

type Props = {
  user: UserDto | null;
};


const scrollDown = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

export default function Home({ user }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
          textAlign: 'center',
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
          <Image src={indexImage} alt="Picture of the author" width={1200} height={300} />
          <Typography width='60%' variant="h3" component="h1" gutterBottom>
            Welcome on our website!
          </Typography>
        </Box>
        <Typography width='40%' variant="subtitle1" gutterBottom>Est fugiat dolor cupidatat nisi ipsum commodo commodo eu ad. Et proident duis laboris sint excepteur. Consectetur tempor reprehenderit in magna in id velit consequat reprehenderit. Esse tempor ut excepteur ex cupidatat eiusmod proident ex duis. Irure eu non ut eu anim id nulla ea tempor eu nulla culpa dolore.</Typography>
        <Button sx={{ justifySelf: 'flex-end' }} onClick={() => scrollDown()}>Learn more</Button>
      </Box>
      <Box sx={{ maxWidth: '30%', margin: 'auto' }} >
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
        }}
      >
        <Typography>CONTENT</Typography>
      </Box>


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
