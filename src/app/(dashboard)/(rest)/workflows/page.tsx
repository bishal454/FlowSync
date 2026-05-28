import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();

  return <p>Workflows</p>;
};
export default Page;

//here is a user experienc middleware main is by the trpc data access layers.
