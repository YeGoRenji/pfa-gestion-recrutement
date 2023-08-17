import do_stuff from "./stuff"

type Props = {}

async function Somewhere({}: Props) {

  const data = await do_stuff()


  return (
    <div>
      <div>Value :</div>
      <div>{data.message}</div>
    </div>
  )
}

export default Somewhere
