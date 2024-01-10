import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timetable from "./pages/Timetable"
import Courses from "./pages/Courses"
import Teachers from "./pages/Teachers"
import Venues from "./pages/Venues"
import Sections from "./pages/Sections"

 
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Timetable />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
