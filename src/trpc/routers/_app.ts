import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { TRPCError } from "@trpc/server";
import { workflowsRouter } from "@/features/workflows/server/routers";


export const appRouter = createTRPCRouter({
 workflows:workflowsRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;
// we need to create router for our project and this is the basic code for creating router in trpc and we can add more procedures in this router as per our requirement .
