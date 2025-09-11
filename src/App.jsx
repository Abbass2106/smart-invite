import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Admin from "./components/Admin";
import CreateEvent from "./components/CreateEvent";
import ViewEvents from "./components/ViewEvents";
import ViewGuest from "./components/ViewGuests";
import CardCheckin from "./components/CardCheckin";
import UploadGuests from "./components/UploadGuests";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/manual-checkin" element={<CardCheckin />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/view-guests" element={<ViewGuest />} />
        <Route path="/upload-guests" element={<UploadGuests />} />
      </Routes>
    </Router>
  );
};

export default App;