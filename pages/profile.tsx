import React from 'react';
import { GetServerSideProps } from 'next';
import { getUserFromSession, UserDto } from '@/lib/auth/user';
import { Box, Button, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
// import CustomButton from '@/components/CustomButton';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoBox from '@/components/profile/infoBox';
import Settings from '@/components/profile/settings';
import { useIsMobile } from '@/lib/material/useIsMobile';

type Props = {
  user: UserDto;
};

type TabsItem = {
  icon: JSX.Element;
  label: string;
  component?: React.FC<{ user: UserDto }>;
};

const TABS: Array<TabsItem> = [
  { icon: <InfoIcon />, label: 'Info', component: InfoBox },
  { icon: <SettingsIcon />, label: 'Settings', component: Settings },
];

export default function Profile({ user }: Props) {
  const isMobile = useIsMobile();

  const [active, setActive] = React.useState(0);

  const ActiveComponent = TABS[active].component;

  return (
    <Box
      sx={{
        margin: 'auto',
        mt: '2vh',
        width: isMobile ? '100%' : '80%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        '@media (max-width: 1050px)': {
          width: '100%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '100%' : '20%',
        }}
      >
        <Stack>
          {TABS.map((item, index) => (
            <Button
              sx={{ justifyContent: 'right' }}
              key={index}
              startIcon={item.icon}
              onClick={() => setActive(index)}
              variant={index === active ? 'contained' : 'text'}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          width: isMobile ? '100%' : 'fit-content',
        }}
      >
        {ActiveComponent ? <ActiveComponent user={user} /> : null}
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const user = await getUserFromSession(req);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
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
