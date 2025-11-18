// // app/db.server.js
// // Stub – not used in standalone mode, but prevents import errors

// const prisma = {
//   session: {
//     findFirst: async () => null,
//     findUnique: async () => null,
//     update: async () => null,
//     upsert: async () => null,
//   },
// };

// export default prisma;


// app/db.server.js
import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance
const prisma = new PrismaClient();

export default prisma;