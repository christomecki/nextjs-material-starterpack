import { STARTING_CHAIN } from './chain';
import { userDto, User } from './userType';

describe('userType', () => {
  test('userDto', () => {
    const validUser: User = {
      createdAt: 0,
      email: 'asd@asd.pl',
      hash: 'asd',
      salt: 'asd',
      chain: STARTING_CHAIN,
    };

    expect(userDto(validUser)).toEqual({
      createdAt: 0,
      email: 'asd@asd.pl',
      emailConfirmed: false,
    });

    //check if userDto is not including password (hash and salt) and raw chain
    expect('hash' in (userDto(validUser) as object)).toBe(false);
    expect('salt' in (userDto(validUser) as object)).toBe(false);
    expect('chain' in (userDto(validUser) as object)).toBe(false);
  });
});
