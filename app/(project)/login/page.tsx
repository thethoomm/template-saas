import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-semibold">Login</h1>

      <form action={handleAuth}>
        <button
          type="submit"
          className="border border-gray-400 px-4 py-2 cursor-pointer"
        >
          Signin with Google
        </button>
      </form>
    </div>
  );
}
