import React, { useState, useEffect } from "react";
import { startOfWeek, addMonths, subMonths, addDays, format } from "date-fns";
import RenderCells from "./RenderCells";
import requestObject from "../requestObject.json";
import DisplayCard from "./DisplayCard";
import Dialog from "@reach/dialog";

function Calendar() {
  let [currentMonth, setCurrentMonth] = useState(new Date());
  let [displayCard, setDisplayCard] = useState(null);
  const close = () => setDisplayCard(null);
  let [data, setData] = useState(false);

  useEffect(() => {
    const url = "http://quinncareapi-dev.us-east-2.elasticbeanstalk.com/graph";
    const proxyURl = "https://cors-anywhere.herokuapp.com/";

    fetch(proxyURl + url, {
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
      <div
        className="header row flex-middle fixed top-0 left-72 right-0 z-10"
        style={{ position: "sticky", top: "0px", background: "black" }}
      >
        <span>{format(month, dateFormat)}</span>
      </div>
    );
  }
  function renderMonth(month) {
    const dateFormat = "MMMM-yyyy";
    return (
      <div className="header row flex-middle top-0 left-0 right-0 z-10">
        <span>{format(month, dateFormat)}</span>
      </div>
    );
  }

  function renderDays(month) {
    const dateFormat = "iii";
    const days = [];
    let startDate = startOfWeek(month);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center  " key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return (
      <div className="days row sticky  top-0 left-0 right-0 z-20 bg-gray-100">
        {renderMonth(month)}
        {days}
      </div>
    );
  }

  // let nextMonth = () => {
  //   setCurrentMonth(addMonths(currentMonth, 1));
  // };
  // let prevMonth = () => {
  //   setCurrentMonth(subMonths(currentMonth, 1));
  // };

  const handleScroll = (event) => {
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
      className="relative"
    >
      {/* {renderHeader(currentMonth)} */}
      {renderDays(currentMonth)}

      {[
        // subMonths(currentMonth, 1),
        currentMonth,
        // addMonths(currentMonth, 1),
      ].map((month) => {
        return (
          <div className="calendar ">
            {/* {renderMonth(month)} */}

            <RenderCells
              currentMonth={month}
              setCurrentMonth={setCurrentMonth}
              data={data}
              setDisplayCard={setDisplayCard}
            />

            <Dialog isOpen={!!displayCard} onDismiss={close} className="modal">
              <DisplayCard
                displayCard={displayCard}
                data={data}
                close={close}
              />
            </Dialog>
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
