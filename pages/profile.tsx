import { useUser } from "../lib/useUser";
import Layout from "../components/layout";

export default function Profile() {
  const user = useUser({ redirectTo: "/login" });

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
}
