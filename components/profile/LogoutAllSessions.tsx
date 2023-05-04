import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export default function LogoutAllSession() {
  return (
    <Box>
      <Typography variant="h5" component="div">
        Do you want to logout from all sessions?
      </Typography>
      <Typography sx={{ mt: 1.5 }} color="text.secondary">
        This will log you out from all devices and you will have to login again.
      </Typography>

      <Button variant="contained" color="warning" size="small">
        Logout
      </Button>
    </Box>
  );
}
