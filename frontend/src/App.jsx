import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import PokeSelectPage from './pages/poke_select_page';
import PokeOppSelectPage from './pages/poke_opp_select_page';
import { ArenaPage, ResultPage } from './pages/result_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon-selection" element={<PokeSelectPage />} />
        <Route path="/opponent-selection" element={<PokeOppSelectPage />} />
        <Route path="/arena" element={<ArenaPage />} />
        <Route path="/result" element={<ResultPage />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
}

export default App;