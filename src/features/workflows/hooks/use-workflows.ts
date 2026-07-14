import { useTRPC } from "@/trpc/client";
import {
  useSuspenseQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useWorkflowsParams } from "@/features/workflows/hooks/use-workflows-params";
import { toast } from "sonner";

/**
 * useSuspenseWorkflows
 *
 * What: A custom hook that returns a React Query "suspense"-enabled query
 *       for fetching multiple workflow records via TRPC.
 *
 * Why: useSuspenseQuery integrates with React Suspense. When this hook is
 *       called while rendering a component wrapped in a <Suspense> boundary,
 *       React will suspend rendering of that component until the query
 *       resolves (either success or error). This simplifies loading state
 *       handling by delegating it to the Suspense boundary instead of
 *       managing local loading flags.
 *
 * How: The hook obtains a typed TRPC client via useTRPC() and then calls
 *       useSuspenseQuery with the queryOptions provided by the trpc
 *       procedure (trpc.workflows.getMany.queryOptions()). React Query will
 *       perform the network request and integrate with Suspense to pause
 *       rendering until the data is available.
 *
 * When to use: Use this hook in components that are rendered inside a
 *       React <Suspense fallback={...}> boundary and when you prefer the
 *       Suspense-based loading model (centralized fallback UI) instead of
 *       handling loading/error states locally in each component.
 *
 * Notes:
 * - Ensure the component tree has a Suspense boundary (or an SSR-aware
 *   setup) otherwise suspending queries will throw and break rendering.
 * - For cases where you need fine-grained control over loading/error UI,
 *   prefer useQuery instead of useSuspenseQuery.
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};
//fetch all the workflow witht  the perfetch

//hook to create a new  workflow

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({}),
        );
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    }),
  );
};


//hook to remove  workflow

export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" removed`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id }),
        );
      }
    })
  )
}



/**
 * Hook to fetch a single workflow using suspense
 */
export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
};


/**
 * Hook to update a workflow name
 */
export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" updated`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({}),
        );
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(`Failed to update workflow: ${error.message}`);
      },
    }),
  );
};


/**
 * Hook to update a workflow
 */
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" saved`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({}),
        );
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.error(`Failed to save workflow: ${error.message}`);
      },
    }),
  );
};



/**
 * Hook to execute a workflow
 */
export const useExecuteWorkflow = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.execute.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" executed`);
      },
      onError: (error) => {
        toast.error(`Failed to execute workflow: ${error.message}`);
      },
    }),
  );
};
