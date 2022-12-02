import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users = Array.from({ length: 50 }).map(() => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    github: faker.internet.userName(),
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
    Array.from({ length: 550 }).map(async () => {
      const authorId = faker.helpers.arrayElement(usersCreated).id;

      const projectCreated = await prisma.project.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.lorem.paragraphs(),
          preview: faker.image.abstract(800, 600, true),
          repoLink: faker.internet.url(),
          siteLink: faker.internet.url(),
          likesCount: 0,
          isApproved: true,
          author: {
            connect: {
              id: String(authorId),
            },
          },
          tags: {
            set: Array.from({ length: 5 }).map(() =>
              faker.commerce.productAdjective()
            ),
          },
        },
      });

      console.log(`Created project ${projectCreated.id}, author ${authorId}`);

      const numberOfLikes = Math.floor(Math.random() * 50) + 1;

      Promise.all(
        faker.helpers
          .arrayElements(usersCreated, numberOfLikes)
          .map(async (user) => {
            console.log(
              `Creating ${numberOfLikes} likes for project ${projectCreated.id}`
            );
            await prisma.project.update({
              where: {
                id: projectCreated?.id,
              },
              data: {
                likesCount: {
                  increment: 1,
                },
                likes: {
                  connect: {
                    id: user.id,
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
