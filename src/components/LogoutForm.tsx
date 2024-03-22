import { logout } from "@/actions";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button>logout</button>
    </form>
  );
}
