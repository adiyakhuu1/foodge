import Link from "next/link";

export default function App() {
  return (
    <Link href={`/admin?id=1223`}>
      <div>Admin</div>
    </Link>
  );
}
