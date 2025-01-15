import Link from "next/link";

export default function App() {
  return (
    <Link href={`/admin?page=food order`}>
      <div>Admin</div>
    </Link>
  );
}
