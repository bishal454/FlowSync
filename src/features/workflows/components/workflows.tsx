import { useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <p>{JSON.stringify(workflows.data, null, 2)};</p>;
};
