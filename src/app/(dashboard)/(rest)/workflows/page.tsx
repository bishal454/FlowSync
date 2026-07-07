import { prefetchWorkflows } from "@/features/workflows/server/prefetch";

import {
  WorkflowsContainer,
  WorkflowsError,
  WorkflowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/workflows";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import type { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};
const Page = async ({ searchParams }: Props) => {
  await requireAuth();
  const params = await workflowsParamsLoader(searchParams); //cannot be used as a validatior
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};
export default Page;
//we will prefetch the workflows

//here is a user experienc middleware main is by the trpc data access layers.
