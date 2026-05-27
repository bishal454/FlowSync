import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <div>
      <LoginForm />
    </div>
  );
};
export default Page;
//(auht )is only for folder purpose not the path for url .
//main protection is on trpc prtoected procedure our main  routes protection
