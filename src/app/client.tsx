"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    const trpc = useTRPC();
    const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

    return (
        <div className="flex flex-col items-center justify-center border border-red-500">Client component: {JSON.stringify(users)}</div>
    )
}
//in this client comp populated with server comp .
