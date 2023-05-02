import React, { Component } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import errorImage from 'public/404err.png';
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
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
          <Typography>This site can’t be reached!</Typography>
          <Link href="/">
            <Button color="inherit">Back Home</Button>
          </Link>
        </Box>
      );
    }

    // Render the children components normally
    return this.props.children;
  }
}

export default ErrorBoundary;
