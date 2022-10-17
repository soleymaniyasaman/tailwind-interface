import AddAppointment from "./components/AddAppointment";
import Search from "./components/Search";
import { BiCalendar } from 'react-icons/bi'
import appointmentData from './data.json'
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  return (
    <div className="container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointment
      </h1>
      <AddAppointment />
      <Search />
      {appointmentData.map(appointment => (
        <AppointmentInfo key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}

export default App;
