import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicSchedule from './MusicSchedule/MusicSchedule';
import Header from './Header/Header';
import DetailedSchedule from './DetailedSchedule/DetailedSchedule';

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<MusicSchedule />} />
          <Route path="/users/:userId/schedules/:scheduleId" element={<DetailedSchedule />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
