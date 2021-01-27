import React from "react";
import VisuallyHidden from "@reach/visually-hidden";

export default function DisplayCard({
  displayCard,
  setDisplayCard,
  data,
  close,
}) {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <button onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <div>
        <h1>display card</h1>
      </div>
    </div>
  );
}
