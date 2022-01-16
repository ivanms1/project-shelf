import { PrismaClient } from '@prisma/client';

export interface Context {
  db: PrismaClient;
  currentUserId: string;
}
