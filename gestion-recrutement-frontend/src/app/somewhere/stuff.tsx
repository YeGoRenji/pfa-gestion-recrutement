export default async function do_stuff()
{
  let data : Object | String = "";
  await fetch(process.env.BACKEND_URL + "/candidatures/test").then(
    (res) => res.json()
  ).then((obj) => {
    console.log("Got", obj);
    data = obj;
  }).catch((err) => {
    data = err.message;
  });

  return data;
}
