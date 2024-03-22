import { login } from "@/actions";

export default function LoginForm() {
  return (
    <form action={login}>
      <input
        type="text"
        name="username"
        required
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="password"
      />
      <button>Login</button>
    </form>
  );
}
