import {requireAuth} from "@/lib/auth-utils";
interface PageProps {
  params: Promise<{
  workflowId: string;
  }>;
}
//params should be a promise because we are using async/await to get the params from the URL. The params will be passed to the page component as a prop, and we can access theworkflowId from it.

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const {workflowId } = await params;
  return <p>Workflow ID: {workflowId}</p>;
};

export default Page;


//dynamic api are async because we need to wait for the params to be resolved before we can render the page. The params will be passed to the page component as a prop, and we can access the workflowId from it.

//http://localhost:3000/workflows/12345
