import { PrismaClient } from "@/generated/prisma/client";
// we want to use it in our api routes and we want to avoid creating multiple instances of prisma client which can lead to memory leaks and performance issues. by creating a single instance of prisma client and exporting it, we can ensure that we are using the same instance throughout our application. bcz of hot load.
const globalForPrisma =global as unknown as { prisma: PrismaClient };


 const prisma = globalForPrisma.prisma ||   new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export default prisma;
