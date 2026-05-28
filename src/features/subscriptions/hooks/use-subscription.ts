import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { subscribe } from "diagnostics_channel";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

//this function can be used to check if the user has an active subscription, by using the `state` property of the subscription object returned by the `useSubscription` hook.
//which use external key of the customer  that is id of the customr in prisma  database and the internal key of the customer that is the id of the customer in polar database to check if the user has an active subscription or not.
export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();

  const hasActiveSubscription =
    customerState?.activeSubscriptions &&
    customerState.activeSubscriptions.length > 0;

  return {
    hasActiveSubscription,
    subscription: customerState?.activeSubscriptions?.[0],
    isLoading,
    ...rest,
  };
};
