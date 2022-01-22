import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
  db: PrismaClient;
  accessToken: string;
};
