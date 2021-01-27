import React, { useState, useEffect } from "react";
import {
  startOfWeek,
  addMonths,
  subMonths,
  addDays,
  format,
  sub,
} from "date-fns";
import RenderCells from "./RenderCells";
import requestObject from "../requestObject.json";
import DisplayCard from "./DisplayCard";
import Dialog from "@reach/dialog";

function Calendar() {
  let [currentMonth, setCurrentMonth] = useState(new Date());
  let [displayCard, setDisplayCard] = useState(null);
  console.log(displayCard, "find if post is there ");
  let [data, setData] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  useEffect(() => {
    const url = "http://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObject),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.responseobjects[0].posts);
      });
  }, []);

  function renderHeader(month) {
    const dateFormat = "MMMM-yyyy";
    return (
      <div className="header row flex-middle">
        {/* <div className="col col-start" onClick={prevMonth}>
          <div className="icon">chevron_left</div>
        </div> */}
        <div className="col col-center">
          <span>{format(month, dateFormat)}</span>
        </div>
        {/* <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div> */}
      </div>
    );
  }

  function renderDays(month) {
    const dateFormat = "iii";
    const days = [];
    let startDate = startOfWeek(month);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  let nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  let prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleScroll = (event) => {
    console.log(
      event.target,
      event.target.scrollHeight,
      event.target.scrollTop
    );

    if (event.target.scrollTop === 0) {
      setCurrentMonth(subMonths(currentMonth, 1));

      return;
    }

    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      {[
        subMonths(currentMonth, 1),
        currentMonth,
        addMonths(currentMonth, 1),
      ].map((month) => {
        return (
          <div className="calendar">
            {renderHeader(month)}
            {renderDays(month)}
            <RenderCells
              currentMonth={month}
              setCurrentMonth={setCurrentMonth}
              data={data}
              setDisplayCard={setDisplayCard}
            />
            {displayCard ? (
              <Dialog isOpen={showDialog} onDismiss={close} className="modal">
                <DisplayCard
                  displayCard={displayCard}
                  setDisplayCard={setDisplayCard}
                  data={data}
                  close={close}
                />
              </Dialog>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
