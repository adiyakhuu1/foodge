import Link from "next/link";

export default function App() {
  return (
    <Link href={`/admin?page=food menu`}>
      <div>Admin</div>
    </Link>
  );
}
