import { Container } from "@mui/system";
import Footer, { FOOTER_HEIGHT } from "./footer";
import Header from "./header";
import Box from "@mui/material/Box";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Box sx={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)` }}>
        <header>
          <Header />
        </header>
        <main>
          <Container sx={{ backgroundColor: "rgba(0, 0, 0, 0.01)", position: "relative", padding: 2 }}>
            {children}
          </Container>
        </main>
      </Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
