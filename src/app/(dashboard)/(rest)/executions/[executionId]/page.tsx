
import { ExecutionView } from "@/features/executions/components/execution";
import { ExecutionsError, ExecutionsLoading } from "@/features/executions/components/executions";
import { prefetchExecution } from "@/features/executions/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";



interface PageProps {
  params: Promise<{
  executionId: string;
  }>;
}
//params should be a promise because we are using async/await to get the params from the URL. The params will be passed to the page component as a prop, and we can access theexecutionId from it.

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { executionId } = await params;
  prefetchExecution(executionId);

  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-3xl w-full flex flex-col gap-y-8 h-full">
        <HydrateClient>
          <ErrorBoundary fallback={<ExecutionsError />}>
            <Suspense fallback={<ExecutionsLoading />}>
              <ExecutionView executionId={executionId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  )
};

export default Page;


//dynamic api are async because we need to wait for the params to be resolved before we can render the page. The params will be passed to the page component as a prop, and we can access the executionId from it.

//http://localhost:3000/executions/12345
