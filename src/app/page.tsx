import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "./client";




const Page = async () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());//levaring the speed by prefetching .we are telling the client component to fetch the data on the server.


  //server comp has no any data as they are not using caller .

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary></div>
  )
}

//we are creating boundary between the server comp and client comp so we do prefetch the query to prevent the initial loading of the page.
//in simple terms we are fetching the data on the server and passing it to the client component in the form of json object .so the client component does not need to fetch the data.
export default Page;

//this app folder is router of next js .and this page.tsx is  root file of the project .
