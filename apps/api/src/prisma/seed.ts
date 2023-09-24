import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users = Array.from({ length: 10 }).map(() => {
  return {
    providerId: faker.helpers.unique(() => faker.random.numeric(5)),
    provider: 'github',
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    github: faker.internet.userName(),
    banned: false,
  };
});

async function main() {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('Users created');

  const usersCreated = await prisma.user.findMany();

  console.log(`Created ${usersCreated.length} users`);

  await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const authorId = faker.helpers.arrayElement(usersCreated).id;

      const projectCreated = await prisma.project.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.lorem.paragraphs(),
          preview: faker.image.abstract(800, 600, true),
          repoLink: faker.internet.url(),
          siteLink: faker.internet.url(),
          isApproved: true,
          author: {
            connect: {
              id: String(authorId),
            },
          },
          tags: {
            set: faker.helpers.uniqueArray(faker.random.word, 5),
          },
        },
      });

      console.log(`Created project ${projectCreated.id}, author ${authorId}`);

      const numberOfLikes = Math.floor(Math.random() * 10) + 1;

      Promise.all(
        faker.helpers
          .arrayElements(usersCreated, numberOfLikes)
          .map(async (user) => {
            console.log(
              `Creating ${numberOfLikes} likes for project ${projectCreated.id}`
            );
            await prisma.like.create({
              data: {
                project: {
                  connect: {
                    id: projectCreated.id,
                  },
                },
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                author: {
                  connect: {
                    id: String(projectCreated.authorId),
                  },
                },
              },
            });

            return null;
          })
      );
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
