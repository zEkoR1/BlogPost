// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Upsert users
//   const user1 = await prisma.user.upsert({
//     where: { username: "User4" },
//     update: {},
//     create: {
//       username: "User4",
//       password: "Password1",
//     },
//   });

//   const user2 = await prisma.user.upsert({
//     where: { username: "User3" },
//     update: {},
//     create: {
//       username: "User3",
//       password: "Password2",
//     },
//   });

//   // Create posts
//   const post1 = await prisma.post.create({
//     data: {
//       title: "First Post by User4",
//       content: "This is the first post content.",
//       authorId: user1.id,
//       tags: {
//         create: [
//           { name: "Technology" },
//           { name: "Programming" },
//         ],
//       },
//     },
//   });

//   const post2 = await prisma.post.create({
//     data: {
//       title: "First Post by User3",
//       content: "This is another post content.",
//       authorId: user2.id,
//       tags: {
//         create: [
//           { name: "Science" },
//           { name: "Education" },
//         ],
//       },
//     },
//   });

//   // Create comments
//   const comment1 = await prisma.comment.create({
//     data: {
//       content: "Great post!",
//       postId: post1.id,
//       authorId: user2.id,
//     },
//   });

//   const comment2 = await prisma.comment.create({
//     data: {
//       content: "Thanks for sharing!",
//       postId: post2.id,
//       authorId: user1.id,
//     },
//   });

//   console.log({ user1, user2, post1, post2, comment1, comment2 });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => await prisma.$disconnect());
