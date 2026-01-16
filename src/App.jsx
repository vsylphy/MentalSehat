import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Moodku from "./pages/Moodku";
import TanyaAI from "./pages/TanyaAI";
import Faq from "./pages/Faq";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/moodku" element={<Moodku />} />
      <Route path="/tanya-ai" element={<TanyaAI />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  );
}

export default App;
