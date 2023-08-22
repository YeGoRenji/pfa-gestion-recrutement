export default async function do_stuff()
{
  let data : Object | String = "";
  await fetch("http://localhost:3333/candidatures/test").then(
    (res) => res.json()
  ).then((obj) => {
    console.log("Got", obj);
    data = obj;
  }).catch((err) => {
    data = err.message;
  });

  return data;
}
