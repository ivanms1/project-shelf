import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const users = Array.from({ length: 10 }).map(() => {
  return {
    providerId: faker.string.uuid(),
    provider: 'github',
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    github: faker.internet.username(),
    banned: false,
  };
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Create users
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('✅ Users created');

  const usersCreated = await prisma.user.findMany();
  console.log(`Created ${usersCreated.length} users`);

  // Create projects
  const projects = [];
  for (let i = 0; i < 20; i++) {
    const authorId =
      usersCreated[Math.floor(Math.random() * usersCreated.length)].id;

    const project = await prisma.project.create({
      data: {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        preview: faker.image.url(),
        repoLink: faker.internet.url(),
        siteLink: faker.internet.url(),
        isApproved: true,
        author: {
          connect: {
            id: String(authorId),
          },
        },
        tags: {
          set: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js'],
        },
      },
    });

    projects.push(project);
    console.log(`✅ Created project: ${project.title}`);
  }

  console.log(`Created ${projects.length} projects`);

  for (const project of projects) {
    const numberOfLikes = Math.floor(Math.random() * 5) + 1; // 1-5 likes per project

    // Create a shuffled array of users to avoid duplicates
    const shuffledUsers = [...usersCreated].sort(() => Math.random() - 0.5);
    const usersToLike = shuffledUsers.slice(0, numberOfLikes);

    for (const user of usersToLike) {
      try {
        await prisma.like.create({
          data: {
            project: {
              connect: {
                id: project.id,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
            author: {
              connect: {
                id: String(project.authorId),
              },
            },
          },
        });
      } catch (error) {
        console.log(
          `⚠️ Skipping duplicate like for user ${user.id} on project ${project.title}`
        );
      }
    }

    console.log(
      `✅ Added ${usersToLike.length} likes to project: ${project.title}`
    );
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
