import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

//import events from "./events";

const FullCalendarDiv = () => {
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        //events={events}
      />
    </div>
  );
}
export default FullCalendarDiv