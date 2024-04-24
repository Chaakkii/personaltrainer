import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchTrainings } from "../trainingapi";

function TrainingsCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings()
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

const localizer = momentLocalizer(moment)

const AgendaDateFormat = (range, culture, localizer) => {
    const startDate = localizer.format(range.start, 'DD/MM/YYYY', culture);
    const endDate = localizer.format(range.end, 'DD/MM/YYYY', culture);
    return `${startDate} — ${endDate}`;
  };

const formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({ start, end }, culture, localizer) => localizer.format(start, 'HH:mm', culture) + ' – ' + localizer.format(end, 'HH:mm', culture),
  agendaHeaderFormat: AgendaDateFormat,
}

function AgendaTime({ event }) {
  return (
    <div>
      <span>{event.customTitle}</span>
    </div>
  );
}

  const events = trainings.map(training => ({
    id: training.id,
    title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
    start: new Date(training.date),
    end: moment(training.date).add(training.duration, 'minutes').toDate(),

    customTitle: `${moment(training.date).format("HH:mm")} - ${moment(training.date).add(training.duration, 'minutes').format("HH:mm")}`,
  }));

  

  return (
    <div style={{ height: 600, width: 1400 }}>
      <Calendar
        localizer={localizer}
        events={events}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: 50 }}
        components={{ agenda: { time: AgendaTime, agendaHeaderFormat: AgendaDateFormat, } }}
      />
    </div>
  );
}


export default TrainingsCalendar;
