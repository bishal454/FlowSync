import 'server-only'; // <-- ensure this file cannot be imported from the client
 
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';
 
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
 
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});



export const caller = appRouter.createCaller(createTRPCContext);
//  we're creating a caller instance of TRPC for the server component. This will allow us to call the TRPC data access layer through a server component. So you already probably know that since we added 10-stack query, on the client side we're going to be using useQuery and useMutation and we can preserve outsession


// this file is used to create a trpc client for our app and we can use this client to make api calls to our trpc server and we can also add more features in this file as per our requirement and this file will be used in our app to provide the trpc client to our components .
