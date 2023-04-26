import { NextApiRequest, NextApiResponse } from 'next';
import { User, findUser, isValidEmailAddress } from '@/lib/auth/user';
import passwordValidation from '@/lib/passValidation/passwordValidaton';
import crypto from 'crypto';
import { database } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const userCollection = database.collection<User>('user');

export default async function changePassword(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (typeof req.body === 'object') {
      const { password, oldpassword, email } = req.body;
      if (email != null && isValidEmailAddress(email) && passwordValidation(password).every((x) => x === true)) {
        const user = await findUser(email);
        if (!user) {
          res.status(401).send({ done: false });
          return;
        }

        const oldHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
        if (oldHash === user.hash) {
          res.status(401).send({ done: false });
          return;
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        await userCollection.updateOne({ _id: new ObjectId(user._id) }, { $set: { hash: newHash, salt: salt } });
        res.status(200).send({ done: true });
      }
    }
  } catch (error: any) {}
}
