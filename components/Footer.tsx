import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme, darken, lighten } from '@mui/material/styles';

export const FOOTER_HEIGHT = 64;

export default function Footer() {
  return (
    <Box
      sx={(theme) => ({
        height: FOOTER_HEIGHT,
        backgroundColor: backgroundColor(theme),
        asd: theme.palette.tonalOffset,
      })}
    >
      <Typography variant="h6" align="center" gutterBottom>
        My Website
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

function backgroundColor(theme: Theme) {
  const modifier = theme.palette.mode === 'light' ? darken : lighten;
  return modifier(theme.palette.background.paper, 0.05);
}
