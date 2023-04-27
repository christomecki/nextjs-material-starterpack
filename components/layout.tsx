import Footer, { FOOTER_HEIGHT } from './footer';
import Header from './header';
import Box from '@mui/material/Box';
import { UserDto } from '@/lib/auth/user';
import ErrorBoundary from './ErrorBoundary';

export default function Layout({ children, user }: React.PropsWithChildren<{ user: UserDto | undefined | null }>) {
  return (
    <>
      <Box sx={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
        <header>
          <Header user={user} />
        </header>
        <main>
          <ErrorBoundary>
            <Box sx={{ position: 'relative', padding: 0 }}>{children}</Box>
          </ErrorBoundary>
        </main>
      </Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
//(theme) => ({ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`, backgroundColor: theme.shadows })
