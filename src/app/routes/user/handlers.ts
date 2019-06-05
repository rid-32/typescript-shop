import { Types, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

import User from '../../models/user';

interface UserShape {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

const userShape: UserShape = {
  _id: null,
  email: null,
  password: null,
};
const userFieldsForSelection: string[] = Object.keys(userShape);

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
    }

    res.status(201).end();
  } catch (error) {
    res.status(400).end();
  }
};

const getUserFromDocument = (user: Document): UserShape => {
  const result = userShape;

  for (const key in user) {
    if (userFieldsForSelection.includes(key)) result[key] = user[key];
  }

  return result;
};

export const loginUser = async (req, res): Promise<void> => {
  const { email, password } = req.body;

  try {
    const users: Document[] = await User.find({ email });

    if (!users.length) {
      return res.status(401).end();
    }

    const {
      _id: userId,
      password: passwordHash,
      email: extractedEmail,
    } = getUserFromDocument(users[0]);
    const isWrongPassword = !(await bcrypt.compare(password, passwordHash));

    if (isWrongPassword) {
      return res.status(401).end();
    }

    const payloadForToken = {
      userId,
      email: extractedEmail,
    };
    const SECRET_KEY = config.get<string>('JWT_KEY');
    const tokenOptions = {
      expiresIn: '1h',
    };

    const token = jwt.sign(payloadForToken, SECRET_KEY, tokenOptions);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(401).end();
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
