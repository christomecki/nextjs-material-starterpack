import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "@mui/material/Link";
import { FormEvent } from "react";

type Props = {
  isLogin: boolean;
  errorMessage?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Form({ isLogin, errorMessage, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField label="Username" variant="outlined" type="text" name="username" required />
        <TextField label="Password" variant="outlined" type="password" name="password" required />

        {!isLogin && <TextField label="Repeat password" variant="outlined" type="password" name="rpassword" required />}

        <div className="submit">
          {isLogin ? (
            <>
              <Link href="/signup">I dont have an account</Link>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">I already have an account</Link>
              <Button type="submit" variant="contained" color="primary">
                Signup
              </Button>
            </>
          )}
        </div>
      </Stack>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  );
}
