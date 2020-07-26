import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FullCalendarDiv = ({datoscita, setDatoscita, allevents, btndisabled}) => {
    const handleDateClick = (arg) => {   
        let fechainiciovalida=moment();
        let fechafinvalida=moment().add(1,'months');    
        let dateselected=moment(arg.date);
        if (btndisabled===false){
        if ((dateselected<fechainiciovalida)||(dateselected>fechafinvalida)){
            MySwal.fire({
                icon: "warning",
                title: "Escoge una fecha válida!",
                text: "No puedes solicitar una cita en esta fecha y hora!",
              })
        }else{
            let date=arg.dateStr;
            let currentFecha=date.slice(0,10);
            let currentHora=date.slice(11,19);
            let currentAll=currentFecha+" "+currentHora;
            let datefinm =moment(date).add(15,'m');
            let currentend=moment(datefinm).utcOffset(-5).format();
            let currentHorafin=currentend.slice(11,19);
            let currentAllfin= currentFecha+" "+currentHorafin;
            
            setDatoscita({
                ...datoscita,
                fecha: currentFecha,
                hora: currentHora,
                hora_inicial: currentAll,
                hora_fin: currentAllfin,
            });
        }
    }
    }

    const handleSelect = (arg) => {
        //alert("selected "+arg.startStr+" "+arg.endStr);
        
    }

    const handlewindowresize = (arg) => {
        //alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
    }

    return (
        <div>
        <FullCalendar
            //defaultView="timeGridWeek"
            plugins= {[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
            headerToolbar= {{
        		left: 'prev,next today',
        		center: 'title',
        		right: 'dayGridMonth,timeGridWeek,timeGridDay'
      		}}
            dateClick={handleDateClick}
            selectable={false}
            editable={false}
            droppable={false}
            selectOverlap={false}
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
            hiddenDays={[0]}
            windowResize={handlewindowresize}
            aspectRatio={[1.99]}
            events={allevents}
        />
        </div>
    );
}
export default FullCalendarDiv