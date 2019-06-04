import { Types, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import User from '../../models/user';

interface UserShape {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

export const signupUser = async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    const foundUsers: Document[] = await User.find({ email });

    const isNewEmail: boolean = !foundUsers.length;

    if (isNewEmail) {
      const hashPassword: string = await bcrypt.hash(password, 10);

      const userPayload: UserShape = {
        _id: Types.ObjectId(),
        email,
        password: hashPassword,
      };

      const user: Document = new User(userPayload);

      await user.save();

      res.status(201).end();
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
};

export const deleteUser = async (req, res): Promise<void> => {
  try {
    const { id: _id }: { id: Types.ObjectId } = req.params;

    await User.remove({ _id });

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
};
