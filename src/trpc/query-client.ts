import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';

import superjson from "superjson";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}


// used to create a query client for our trpc api and we can add more features in this file as per our requirement and this file will be used in our app to provide the query client to our components .
