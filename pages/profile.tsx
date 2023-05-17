import React from 'react';
import { GetServerSideProps } from 'next';
import { getUserFromSession, UserDto } from '@/lib/auth/user';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Divider, Typography } from '@mui/material';
import InfoBox from '@/components/profile/ProfileInfo';
import LogoutAllSession from '@/components/profile/LogoutAllSessions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import DeleteAccount from '@/components/DeleteAccount';
import { LoginDetails } from '@/components/profile/LoginDetails';

type Props = {
  user: UserDto;
};

type AccordionPanels = 'loginDetails' | 'changePassword' | 'logoutAllSessions' | 'deleteAccount';

export default function Profile({ user }: Props) {
  const [expanded, setExpanded] = React.useState<AccordionPanels | false>(false);

  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <InfoBox user={user} />

      <Divider sx={{ my: 2 }} />
      <Box>
        {(user.lastFailedLogin != null || user.lastLogin != null) && (
          <AccordionPanel expanded={expanded} setExpanded={setExpanded} name="loginDetails" title="Login Details">
            <LoginDetails lastFailedLogin={user.lastFailedLogin} lastLogin={user.lastLogin} />
          </AccordionPanel>
        )}

        <AccordionPanel expanded={expanded} setExpanded={setExpanded} name="changePassword" title="Change password">
          <ChangePasswordForm user={user} />
        </AccordionPanel>

        <AccordionPanel expanded={expanded} setExpanded={setExpanded} name="logoutAllSessions" title="Logout from all sessions">
          <LogoutAllSession />
        </AccordionPanel>

        <AccordionPanel expanded={expanded} setExpanded={setExpanded} name="deleteAccount" title="Delete account">
          <DeleteAccount />
        </AccordionPanel>
      </Box>
    </Container>
  );
}

function AccordionPanel({
  name,
  title,
  children,
  expanded,
  setExpanded,
}: React.PropsWithChildren<{
  name: AccordionPanels;
  title: string;
  expanded: AccordionPanels | false;
  setExpanded: (panel: AccordionPanels | false) => void;
}>) {
  return (
    <Accordion expanded={expanded === name} onChange={(_, isExpanded) => setExpanded(isExpanded ? name : false)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="button">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
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
