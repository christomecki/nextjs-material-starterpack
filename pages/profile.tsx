import React from "react";
import { GetServerSideProps } from "next";
import { getUserFromSession, UserDto } from "@/lib/auth/user";
import { Box, Stack } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import CustomButton from "@/components/CustomButton";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoBox from '@/components/infoBox'
import Settings from "@/components/settings";
import { useIsMobile } from "@/lib/material/useIsMobile";

type Props = {
  user: UserDto;
};

export default function Profile({ user }: Props) {
  const isMobile = useIsMobile();
  const MenuButtons = [
    { icon: <InfoIcon />, label: 'Info', component: <InfoBox user={user} /> },
    { icon: <SettingsIcon />, label: 'Settings', component: <Settings user={user} /> },
    { icon: <LogoutIcon />, label: 'Logout all sessions' },
  ]
  const [activeButton, setActiveButton] = React.useState<string>('Info');

  return (
    <Box sx={{
      margin: 'auto',
      mt: '2vh',
      width: isMobile ? '100%' : '80%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '@media (max-width: 1050px)': {
        width: '100%',
      },
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '100%' : '20%',
      }}>
        <Stack >
          {MenuButtons.map((item) => (<CustomButton key={item.label} startIcon={item.icon} label={item.label} onClick={setActiveButton}>{item.label}</CustomButton>))}
        </Stack>
      </Box>
      <Box sx={{
        width: isMobile ? '100%' : 'fit-content',
      }}>
        {MenuButtons.map((item) => (
          activeButton === item.label ? item.component : null
        ))}
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const user = await getUserFromSession(req);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };

};

