import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

//import events from "./events";

const FullCalendarDiv = ({datoscita, setDatoscita, datoscitaSave, setDatoscitaSave}) => {
    const handleDateClick = (arg) => {
        let date=arg.dateStr;
        let currentFecha=date.slice(0,10);
        let currentHora=date.slice(11,19);
        let currentAll=currentFecha+" "+currentHora;
        setDatoscita({
            ...datoscita,
            fecha: currentFecha,
            hora: currentHora
        })
        setDatoscitaSave({
            ...datoscitaSave,
            fech_inicial: currentAll
        })
    }

    const handleSelect = (arg) => {
        alert("selected "+arg.startStr+" "+arg.endStr);
    }

    const handlewindowresize = (arg) => {
        //alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
    }

    return (
        <div>
        <FullCalendar
            defaultView="timeGridWeek"
            plugins= {[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
            headerToolbar= {{
        		left: 'prev,next today',
        		center: 'title',
        		right: 'dayGridMonth,timeGridWeek,timeGridDay'
      		}}
            dateClick={handleDateClick}
            selectable={false}
            editable
            slotDuration={"00:15"}
            allDaySlot={false}
            slotMinTime={"09:00"}
            slotMaxTime={"21:00"}
            slotLabelFormat={{
                hour: 'numeric',
        		minute: '2-digit',
        		hour12: true
            }}
            locale='es'
            nowIndicator
            select={handleSelect}
            buttonText={{
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Dia'
            }}
            selectMirror
            unselectAuto={false}
            // eventConstraint={{
            //     start: now
            // }}
            hiddenDays={[0]}
            windowResize={handlewindowresize}
            aspectRatio={[1.99]}
        />
        </div>
    );
}
export default FullCalendarDiv