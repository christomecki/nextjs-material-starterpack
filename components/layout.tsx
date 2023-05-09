import Footer, { FOOTER_HEIGHT } from './footer';
import Header from './header';
import Box from '@mui/material/Box';
import { UserDto } from '@/lib/auth/user';
import ErrorBoundary from './ErrorBoundary';

export default function Layout({ children, user }: React.PropsWithChildren<{ user: UserDto | undefined | null }>) {
  return (
    <>
      <ErrorBoundary>
        <Box sx={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
          <header>
            <Header user={user} />
          </header>
          <main>
              <Box sx={{ position: 'relative', padding: 0 }}>{children}</Box>
          </main>
        </Box>
        <footer>
          <Footer />
        </footer>
      </ErrorBoundary>
    </>
  );
}
//(theme) => ({ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`, backgroundColor: theme.shadows })
