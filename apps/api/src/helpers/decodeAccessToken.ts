import jwt from 'jsonwebtoken';

const decodeAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return undefined;
  }
};

export default decodeAccessToken;
