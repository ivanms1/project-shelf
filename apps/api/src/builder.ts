import PrismaPlugin from '@pothos/plugin-prisma';
import SchemaBuilder from '@pothos/core';

import type PrismaTypes from '@pothos/plugin-prisma/generated';

import db from './db';

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    accessToken: string;
  };
  Objects: {
    ProjectsResponse: {
      nextCursor: string;
      prevCursor: string;
      totalCount: number;
      results: PrismaTypes['Project']['Shape'][];
    };
    TopCreatorsResponse: {
      results: PrismaTypes['User']['Shape'][];
    };
    TopProjectsResponse: {
      results: PrismaTypes['Project']['Shape'][];
    };
    UserResponse: {
      totalCount: number;
      results: PrismaTypes['User']['Shape'][];
      bannedUsers: number;
    };
  };
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: JSON;
      Output: JSON;
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});

export default builder;
