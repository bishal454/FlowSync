import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {  // as get api call
      return prisma.user.findMany();

    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;
// we need to create router for our project and this is the basic code for creating router in trpc and we can add more procedures in this router as per our requirement .
