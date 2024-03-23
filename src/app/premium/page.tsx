import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Premium() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isPro) {
    return (
      <div className="notPremium">
        <p>Only premium users can see the content</p>
        <Link href="/profile">
          Go to profile page to get premium
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Wellcome to the Premium page</h1>
      <ul>
        <li>Orange</li>
        <li>Apple</li>
        <li>Peach</li>
      </ul>
    </div>
  );
}
