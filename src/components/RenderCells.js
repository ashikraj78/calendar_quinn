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

export default function RenderCells({
  currentMonth,
  setCurrentMonth,
  data,
  setDisplayCard,
}) {
  function renderSwitch(activity) {
    switch (activity) {
      case "hair cut":
        return "Cu";
      case "protein treatment":
        return "Pr";

      case "hair color":
        return "HC";

      case "deep conditioning":
        return "DC";

      case "clarifying":
        return "C";
      default:
        return "W";
    }
  }

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
                <StarRating rating={foundPost && foundPost.rating} />
                <div className="font-bold">{formattedDate}</div>
              </div>
              <img
                className="h-24"
                src={foundPost.images[0].imageurl}
                alt="postedImage"
              />
              <div className="flex px-1 py-1.5">
                {foundPost.typeofday.map((activity) => (
                  <div className="bg-red-100 py-1 px-1.5 rounded-2xl mr-1 ">
                    <p className="text-xs">{renderSwitch(activity)}</p>
                  </div>
                ))}
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
  return (
    <div className="relative">
      <div className="absolute left-0 top-10  z-10 bg-gray-100 inline-block ">
        {format(new Date(currentMonth), "MMMM-yyyy")}
      </div>
      <div className="body">{rows}</div>
    </div>
  );
}
