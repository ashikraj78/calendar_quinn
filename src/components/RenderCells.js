import React from "react";
import {
  startOfWeek,
  endOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";
import StarRating from "./StarRating";
import CardDisplay from "./DisplayCard";
import postImage from "../images/post.jpg";

export default function RenderCells({
  currentMonth,
  setCurrentMonth,
  data,
  setDisplayCard,
}) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      let dateCheck = "yyyy-MM-dd";
      let fdate = format(day, dateCheck);

      const foundPost =
        data &&
        data.find((post) => {
          return (
            format(new Date(post.calendardatetime), "dd-MM-yyyy") ===
            format(day, "dd-MM-yyyy")
          );
        });

      days.push(
        <div className="col cell pt-1.5 " key={day}>
          {foundPost ? (
            <div onClick={() => handleDisplayCard(foundPost)}>
              <div className="flex justify-between px-1 ">
                <StarRating rating={foundPost.rating} />
                <div className="font-bold">{formattedDate}</div>
              </div>
              <img
                className="h-24"
                src={foundPost.images[0].imageurl}
                alt="postedImage"
              />
              <div className="flex justify-between px-1 py-1.5">
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
            </div>
          ) : (
            <div className="font-bold flex justify-center">{formattedDate}</div>
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    function handleDisplayCard(post) {
      setDisplayCard(post);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}
