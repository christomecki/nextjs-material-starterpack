import { Alert, Box, Button, Collapse, TextField, Typography } from '@mui/material';
import Router from 'next/router';
import React, { FormEvent } from 'react';

export default function DeleteAccount() {
  const [password, setPassword] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('delete account');
    try {
      const res = await fetch('api/deleteAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: e.currentTarget.password.value,
        }),
      });
      if (res.status !== 200) {
        setErrorMsg('Something went wrong');
      } else {
        await fetch('api/logout');
        Router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={(theme) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '5px',
        padding: '1rem',
      })}
    >
      <Typography>Enter your password to delete account permanently</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          pt: '1rem',
          pb: '1rem',
        }}
      >
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{}}
        ></TextField>
        <Button variant="contained" type="submit" color="error" sx={{ width: 'max-content' }}>
          DELETE ACCOUNT
        </Button>
      </Box>
      {errorMsg && (
        <Collapse in={errorMsg !== ''}>
          <Alert color="error">{errorMsg}</Alert>
        </Collapse>
      )}
    </Box>
  );
}
