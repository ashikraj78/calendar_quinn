import React, { useState } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import StarRating from "./StarRating";
import { format } from "date-fns";

export default function DisplayCard({ displayCard, data, close }) {
  let index = data.findIndex((post) => {
    return post.id === displayCard.id;
  });
  let [card, setCard] = useState(data[index]);

  return (
    <div className="bg-white  p-2 w-96 h-10/12">
      <button onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <div>
        <img src={card.images[0].imageurl} alt="postPic" />
        <div className="flex justify-between items-center">
          <div className="flex justify-between px-1 py-1.5 w-1/3">
            <div className="bg-red-100 py-1 px-1.5 rounded-2xl ">
              <p className="text-xs">W</p>
            </div>
            <div className="bg-red-100 py-1 px-1.5 rounded-2xl ">
              <p className="text-xs">Dc</p>
            </div>
            <div className="bg-red-100 py-1 px-1.5 rounded-2xl ">
              <p className="text-xs">Pr</p>
            </div>
            <div className="bg-red-100 py-1 px-1.5 rounded-2xl ">
              <p className="text-xs">C</p>
            </div>
          </div>
          <StarRating rating={card.rating} />
        </div>
        <p className="pb-2">
          {format(new Date(card.calendardatetime), "dd-MM-yyyy")}
        </p>
        <p className="text-sm">{card.text}</p>
      </div>
    </div>
  );
}
