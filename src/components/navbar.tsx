import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav">
      <Link href="">Homepage</Link>
      <Link href="">Premium</Link>
      <Link href="">Profile</Link>
      <Link href="">Login</Link>
    </div>
  );
}
