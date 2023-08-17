"use server"

export default async function do_stuff()
{
  const data = await fetch("http://localhost:3333/candidatures/test").then(
    (res) => res.json()
  );

  return data;
}
