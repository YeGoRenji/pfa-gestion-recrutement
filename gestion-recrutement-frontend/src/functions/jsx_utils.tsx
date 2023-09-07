import React from "react";

export function getErrorString(error: any) {
  if (Array.isArray(error)) {
    console.log("Its an array ", error);
    const node = (
      <>
        {error.map((val, index) => (
          <div key={index}>{val}</div>
        ))}
      </>
    );
    return node;
  }
  return error;
}
