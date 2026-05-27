import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });

    return { success: true, message: "job queued " };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    // as get api call
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "bishal@gmail.com",
      },
    });
    return { success: true, message: "job queued " };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
// we need to create router for our project and this is the basic code for creating router in trpc and we can add more procedures in this router as per our requirement .
