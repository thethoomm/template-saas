import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-semibold">Protected Dashboard</h1>

      <span>
        {session?.user?.email ? session.user.email : "Usuário não está logado"}
      </span>

      {session.user?.email && (
        <form action={handleAuth}>
          <button
            type="submit"
            className="border border-gray-400 px-4 py-2 cursor-pointer"
          >
            Logout
          </button>
        </form>
      )}
    </div>
  );
}