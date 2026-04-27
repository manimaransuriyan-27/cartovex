import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, expiresIn: number = 2): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: `${expiresIn}d`,
  });
};
