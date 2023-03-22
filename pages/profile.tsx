import { GetServerSideProps } from "next";
import { getUserFromSession, UserDto } from "@/lib/user";

type Props = {
  user: UserDto;
};

export default function Profile({ user }: Props) {
  return (
    <>
      <h1>Profile</h1>
      <p>Your session:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </>
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
