import { CredentialView } from "@/features/credentials/components/credential";
import { CredentialsError, CredentialsLoading } from "@/features/credentials/components/credentials";
import { prefetchCredential } from "@/features/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}
//params should be a promise because we are using async/await to get the params from the URL. The params will be passed to the page component as a prop, and we can access the credentialId from it.

const Page = async ({ params }: PageProps) => {
  await requireAuth();

  const { credentialId } = await params;
  prefetchCredential(credentialId);

  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-3xl w-full flex flex-col gap-y-8 h-full">
        <HydrateClient>
          <ErrorBoundary fallback={<CredentialsError />}>
            <Suspense fallback={<CredentialsLoading />}>
              <CredentialView credentialId={credentialId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  )
};

export default Page;


//dynamic api are async because we need to wait for the params to be resolved before we can render the page. The params will be passed to the page component as a prop, and we can access the credentialId from it.

//http://localhost:3000/credentials/12345
