import { handleAuth } from "@/app/actions/handle-auth";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-semibold">Login</h1>

      <form
        action={handleAuth}
      >
        <button type="submit" className="border border-gray-400 px-4 py-2 cursor-pointer">Signin with Google</button>
      </form>
    </div>
  );
}
