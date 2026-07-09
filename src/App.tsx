import { Route, Routes } from 'react-router-dom';
import CharacterPage from './pages/CharacterPage';

export default function App() {
  return (
    <Routes>
      <Route path="/characters" element={<CharacterPage />} />
    </Routes>
  );
}