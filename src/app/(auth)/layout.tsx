import { AuthLayout } from "@/features/auth/components/auth-layout";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};
export default Layout;

//shared to all the  folders  and routes within this (auth) folder  and this is only for the layout purpose not for the route protection our main route protection is on trpc protected procedure.
