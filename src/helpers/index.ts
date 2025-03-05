import crypto from 'crypto';
import { getSecret } from './getSecret';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  const SECRET = getSecret();

  if (!SECRET) {
    return;
  }

  const hashedPassword = crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');

  return hashedPassword;
};
