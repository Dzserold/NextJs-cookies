import {
  changePremium,
  changeUsername,
  getSession,
} from "@/actions";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className="profile">
      <h1>Wellcome to the Profile page</h1>
      <p>
        Wellcome, <b>{session.username}</b>
      </p>
      <span>
        You are a <b>{session.isPro ? "Premium" : "Free"}</b>{" "}
        user
      </span>
      <form action={changePremium}>
        <button>
          {session.isPro ? "Cancel" : "Buy"} Premium
        </button>
      </form>

      <form action={changeUsername}>
        <input
          type="text"
          name="username"
          placeholder={session.username}
        />
        <button>Update</button>
      </form>
    </div>
  );
}
