import { AppBar, Button, IconButton, Toolbar, Typography, ButtonProps, Menu, MenuItem, Link, useScrollTrigger, Slide } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { UserDto } from '@/lib/auth/user';
import { useCurrentTheme } from '@/lib/material/CurrentThemeProvider';
import { useIsMobile } from '@/lib/material/useIsMobile';
import React from 'react';
import { AccountCircle, Dns, Home, Logout, Person2 } from '@mui/icons-material';

const menuItems = [
  { icon: <Home />, label: 'Home', linkTo: '/' },
  { icon: <Dns />, label: 'About', linkTo: '/about' },
];

export default function Header({ user }: { user: UserDto | undefined | null }) {
  const currentTheme = useCurrentTheme();

  const isMobile = useIsMobile();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorOpt, setAnchorOpt] = React.useState<null | HTMLElement>(null);
  const openOpt = Boolean(anchorOpt);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: any = () => {
    setAnchorEl(null);
  };
  const handleClickOpt = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorOpt(event.currentTarget);
  };
  const handleCloseOpt: any = () => {
    setAnchorOpt(null);
  };

  const trigger = useScrollTrigger();

  return (
    <>
      {isMobile ? (
        <>
          <AppBar position="static" sx={{ marginTop: '64px' }} />
          <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
              <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClick} sx={{ padding: '10px', marginLeft: '5px' }}>
                  <TextSnippetIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {menuItems.map((items) => (
                    <div key={items.label}>
                      <MenuItem component={Link} href={items.linkTo} onClick={handleClose}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                          {items.icon}
                        </IconButton>
                        <Typography sx={{ flexGrow: 1 }}>{items.label}</Typography>
                      </MenuItem>
                    </div>
                  ))}
                </Menu>
                <Typography sx={{ flexGrow: 1, padding: '10px' }} onClick={handleClick} />
                <IconButton
                  size="medium"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => currentTheme.setTheme(currentTheme.theme === 'light' ? 'dark' : 'light')}
                >
                  {currentTheme.theme === 'dark' ? <DarkMode /> : <LightMode />}
                </IconButton>
                {user ? (
                  <>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handleClickOpt}
                      sx={{ padding: '10px', marginLeft: '5px' }}
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="basic-menu-options"
                      anchorEl={anchorOpt}
                      open={openOpt}
                      onClose={handleCloseOpt}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem component={Link} href="/profile" onClick={handleCloseOpt}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                          <Person2 />
                        </IconButton>
                        <Typography sx={{ flexGrow: 1 }}>Profile</Typography>
                      </MenuItem>
                      <MenuItem component={Link} href="/api/logout" onClick={handleCloseOpt}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                          <Logout />
                        </IconButton>
                        <Typography sx={{ flexGrow: 1 }}>Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button sx={{ color: 'inherit' }} href="/login">
                      Login
                    </Button>
                  </>
                )}
              </Toolbar>
            </AppBar>
          </Slide>
        </>
      ) : (
        <AppBar position="static">
          <Toolbar>
            {menuItems.map((items) => (
              <IconButton key={items.label} color="inherit" href={items.linkTo} disableRipple>
                <Typography>
                  <IconButton size="large" color="inherit" edge="start" aria-label="menu" disableRipple>
                    {items.icon}
                  </IconButton>
                  {items.label}
                </Typography>
              </IconButton>
            ))}

            <Typography sx={{ flexGrow: 1, padding: '10px' }} />
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => currentTheme.setTheme(currentTheme.theme === 'light' ? 'dark' : 'light')}
            >
              {currentTheme.theme === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            {user ? (
              <>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleClickOpt} sx={{ padding: '10px', marginLeft: '5px' }}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="basic-menu-options"
                  anchorEl={anchorOpt}
                  open={openOpt}
                  onClose={handleCloseOpt}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem component={Link} href="/profile" onClick={handleCloseOpt}>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                      <Person2 />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>Profile</Typography>
                  </MenuItem>
                  <MenuItem component={Link} href="/api/logout" onClick={handleCloseOpt}>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                      <Logout />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button sx={{ color: 'inherit' }} href="/login">
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}

function HeaderButton(props: ButtonProps) {
  return <Button variant="contained" color="primary" sx={{ boxShadow: 'none' }} {...props} />;
}
