import { User } from '../models/user';
import jwt, { SignCallback, VerifyCallback } from 'jsonwebtoken';
import { rejects } from 'assert';

const SECRET = 'secret';

interface TokenPayload {
  userId: string;
}

const signAsync = (payload: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const callback: SignCallback = (err, signed) => {
      return err ? reject(err) : resolve(signed);
    };

    jwt.sign(payload, SECRET, callback);
  });

const verifyAsync = (token: string): Promise<TokenPayload> =>
  new Promise((resolve, reject) => {
    const callback: VerifyCallback = (err, decoded) => {
      return err ? reject(err) : resolve(decoded as TokenPayload);
    };

    jwt.verify(token, SECRET, callback);
  });

export class AuthService {
  async createAccessToken(user: User) {
    const userId = user.id;
    const tokenPayload = { userId };
    const token = await signAsync(tokenPayload);

    return token;
  }

  async verifyAccessToken(token: string) {
    return verifyAsync(token);
  }
}
