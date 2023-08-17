import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div>Hello !</div>
      <Link href="/somewhere">
        GO SOMEWHERE
      </Link>
    </div>
  );
}
