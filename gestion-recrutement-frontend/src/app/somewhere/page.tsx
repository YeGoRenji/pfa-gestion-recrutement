"use client"
import { useState } from "react";
import do_stuff from "./stuff";

type Props = {};


function Somewhere({}: Props) {

  const [data, setData] = useState({});

  return (
    <div>
      <div>Value :</div>
      <div>{JSON.stringify(data)}</div>
      <button onClick={async () => {
        setData(await do_stuff())
      }}>Click here</button>
    </div>
  );
}

export default Somewhere;
