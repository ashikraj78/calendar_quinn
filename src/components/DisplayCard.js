import React, { useState } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import StarRating from "./StarRating";
import { format } from "date-fns";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";

export default function DisplayCard({ displayCard, data, close }) {
  let index = data.findIndex((post) => {
    return post.id === displayCard.id;
  });
  let [card, setCard] = useState(data[index]);
  let index2 = data.findIndex((post) => {
    return post.id === card.id;
  });
  function previousCard() {
    setCard(data[index2 + 1]);
  }
  function nextCard() {
    setCard(data[index2 - 1]);
  }

  return (
    <div className="bg-white  p-2 w-96 h-10/12">
      <button onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </button>
      <section className="flex items-center">
        {index2 <= data.length - 2 ? (
          <div className="mr-2">
            <img
              src={leftArrow}
              alt=""
              className="w-24"
              onClick={previousCard}
            />
          </div>
        ) : (
          ""
        )}

        <div>
          <img src={card.images[0].imageurl} alt="postPic" className="h-96" />
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
        {index2 >= 1 ? (
          <div className="ml-2">
            <img src={rightArrow} alt="" className="w-24" onClick={nextCard} />
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
