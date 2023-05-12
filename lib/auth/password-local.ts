import Local from 'passport-local';
import { findUserByEmail, validatePassword } from './user';

//custom exception type for invalid email and password combination
export class InvalidEmailPasswordCombination extends Error {
  constructor() {
    super('Invalid email and password combination');
  }
}

export const localStrategy = new Local.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done) {
    findUserByEmail(email)
      .then((user) => {
        if (user && validatePassword(user, password)) {
          done(null, user);
        } else {
          done(new InvalidEmailPasswordCombination());
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);
