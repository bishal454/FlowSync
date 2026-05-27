import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected server component.
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
};

export default Page;

//  the first question is can I use a middleware? And most of you are thinking of the Next.js middleware. You can use it, but only use it for better user experience. Do not use it as a security layer. There have been countless instances of out libraries being broken into using the Next.js middleware.

// 39:15 That is because Next.js middleware should not be used as the outlayer. So, there are many tutorials which teach you how to automatically protect many of your pages using the middleware. And that is great. You can do that. There's nothing wrong with that.

// 39:31 It's for better user experience. But that shouldn't be your last line of defense. That's why we developed the data access layer. That's why we won't directly call Prisma calls within server components. Instead, we're going to do that through TRPC and we're going to develop something in TRPC called protected procedure and that way we're going to have actual security layer here.

// 39:59 So yes, if you want to, you can explore how to add this to the middleware. But I've given up on teaching people that because people think that that's a security layer. It is not. So when I say middleware, I mean very specifically on Next.js middleware, which is actually a different behavior than what you'd normally think a middleware is. For example, PRPC has its own middlewares, but using out in them is completely fine compared to the Next.js middleware which is more of a proxy than a middleware.

// 40:30 So, yes, what I just did in the page.vsx was basically enough to protect this.
