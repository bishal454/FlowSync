"use client";

import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions()); //fetch  a  workflows from the server using trpc and useQuery hook .

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Ai job queued");
      },

      onError: () => {
        toast.error("Something went wrong");
      },
    }),
  );

  const create = useMutation(
    //to create a new workflow using trpc and useMutation hook and we are also using the trpc client to call the trpc procedures
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("job queued");
      }, // to invalidate the queries after creating a new workflow so that we can get the updated list of workflows.
    }),
  );
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected server component.
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div>
  );
};

export default Page;

//  the first question is can I use a middleware? And most of you are thinking of the Next.js middleware. You can use it, but only use it for better user experience. Do not use it as a security layer. There have been countless instances of out libraries being broken into using the Next.js middleware.

// 39:15 That is because Next.js middleware should not be used as the outlayer. So, there are many tutorials which teach you how to automatically protect many of your pages using the middleware. And that is great. You can do that. There's nothing wrong with that.

// 39:31 It's for better user experience. But that shouldn't be your last line of defense. That's why we developed the data access layer. That's why we won't directly call Prisma calls within server components. Instead, we're going to do that through TRPC and we're going to develop something in TRPC called protected procedure and that way we're going to have actual security layer here.

// 39:59 So yes, if you want to, you can explore how to add this to the middleware. But I've given up on teaching people that because people think that that's a security layer. It is not. So when I say middleware, I mean very specifically on Next.js middleware, which is actually a different behavior than what you'd normally think a middleware is. For example, PRPC has its own middlewares, but using out in them is completely fine compared to the Next.js middleware which is more of a proxy than a middleware.

// 40:30 So, yes, what I just did in the page.vsx was basically enough to protect this.
