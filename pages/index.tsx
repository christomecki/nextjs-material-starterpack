import { useUser } from "../lib/hooks";
import Layout from "../components/layout";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";

export default function Home() {
  const user = useUser();

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI - Next.js example in TypeScript
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>

      <h1>Passport.js Example</h1>

      <p>Steps to test the example:</p>

      <ol>
        <li>Click Login and enter a username and password.</li>
        <li>
          Youll be redirected to Home. Click on Profile, notice how your session is being used through a token stored in
          a cookie.
        </li>
        <li>Click Logout and try to go to Profile again. Youll get redirected to Login.</li>
      </ol>

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
