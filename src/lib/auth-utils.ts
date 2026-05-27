import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //it will get the session from the request headers and check if the user is authenticated or not if not it will redirect to the login page

  if (!session) {
    redirect("/login");
  }
  return session;
};

export const requireUnauth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

 //if user want to visit login page while aut they will redirect to the home page 

  if (session) {
    redirect("/");
  }

};
