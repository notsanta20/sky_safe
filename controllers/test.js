const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

// async function main() {
//   await prisma.folders.delete({
//     where: {
//       id: `fc531d13-14e6-4f86-ad81-5a678094198c`,
//     },
//   });
// }

// async function main() {
//   const data = await prisma.files.create({
//     data: {
//       name: "File-Testing",
//       size: 10000,
//       date: new Date(),
//       folderId: `fc531d13-14e6-4f86-ad81-5a678094198c`,
//       path: `test`,
//       usersId: 1,
//     },
//   });
//   console.log(data);
// }

// async function main() {
//   const data = await prisma.folders.create({
//     data: {
//       name: "N2",
//       parentId: `03ba5a17-0f86-4b3b-968e-dd7a93d17a01`,
//       usersId: 1,
//     },
//   });
//   console.log(data);
// }

// main();
