import AddAppointment from "./components/AddAppointment";
import Search from "./components/Search";
import { BiCalendar } from 'react-icons/bi'
import AppointmentInfo from "./components/AppointmentInfo";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setAppointmentList(data))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointment
      </h1>
      <AddAppointment />
      <Search />
      {appointmentList.map(appointment => (
        <AppointmentInfo key={appointment.id} appointment={appointment}
          onDeleteAppointment={(appointmentId) => {
            setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
          }} />
      ))}
    </div>
  );
}

export default App;
