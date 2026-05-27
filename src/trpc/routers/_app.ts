import prisma from '@/lib/db';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx}) => {
    // as get api call

    console.log({ userId: ctx.auth.user.id });
    return prisma.user.findMany({
      where:{
        id:ctx.auth.user.id,
        //in this way we can only sreach for the current logged in user data  id 
      }
    });
  }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;
// we need to create router for our project and this is the basic code for creating router in trpc and we can add more procedures in this router as per our requirement .
