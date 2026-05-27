import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  await requireUnauth();

  return <LoginForm />;
};
export default Page;
//(auht )is only for folder purpose not the path for url .
//main protection is on trpc prtoected procedure our main  routes protection
