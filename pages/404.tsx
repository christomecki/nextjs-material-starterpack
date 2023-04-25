import React from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import errorImage from 'public/404err.png';
import Image from 'next/image';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Image src={errorImage} alt="img" style={{ width: '100%', height: 'auto', maxWidth: '600px' }} />
      <Typography>The page you’re looking for doesn’t exist.</Typography>
      <Link href="/">
        <Button color="inherit">Back Home</Button>
      </Link>
    </Box>
  );
}
