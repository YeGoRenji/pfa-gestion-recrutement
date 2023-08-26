"use client"

import Link from "next/link";

export default function Home() {

  return (
      <div>
        <div>Hello !</div>
        <div>CONTENT HERE</div>
        <Link href="/somewhere">GO SOMEWHERE</Link>
      </div>
  );
}
