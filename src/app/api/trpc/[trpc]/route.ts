import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
 
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
 
export { handler as GET, handler as POST };

// this file is the entry point for our trpc api and this file will be used by next js to handle all the api requests and we need to export the handler for both GET and POST methods to handle all the api requests from client side .
