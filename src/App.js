import AddAppointment from "./components/AddAppointment";
import Search from "./components/Search";
import { BiCalendar } from 'react-icons/bi'
import AppointmentInfo from "./components/AppointmentInfo";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState('');

  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("petName");

  const filterAppointment = appointmentList.filter(appointment => {
    return (
      appointment.petName.toLowerCase().includes(query.toLowerCase()) ||
      appointment.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      appointment.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1
    return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
  })
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
      <Search query={query}
        onQueryChange={myQuery => setQuery(myQuery)}
        sortBy={sortBy}
        onSortByChange={mySort => setSortBy(mySort)}
        orderBy={orderBy}
        onOrderByChange={myOrder => setOrderBy(myOrder)}
      />
      {filterAppointment.map(appointment => (
        <AppointmentInfo key={appointment.id} appointment={appointment}
          onDeleteAppointment={(appointmentId) => {
            setAppointmentList(appointmentList.filter(appointment => appointment.id !== appointmentId))
          }} />
      ))}
    </div>
  );
}

export default App;
