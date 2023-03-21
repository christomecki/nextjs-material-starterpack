import { AppBar, Button, IconButton, Toolbar, Typography, ButtonProps } from "@mui/material";
import { useUser } from "../lib/hooks";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function Header() {
  const user = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" href="/">
          <TextSnippetIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }}>asd</Typography>
        {user ? (
          <>
            <HeaderButton href="/profile">Profile</HeaderButton>
            <HeaderButton href="/api/logout">Logout</HeaderButton>
          </>
        ) : (
          <HeaderButton href="/login">Login</HeaderButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

function HeaderButton(props: ButtonProps) {
  return <Button variant="contained" color="primary" sx={{ boxShadow: "none" }} {...props} />;
}
