import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/movie/:id"
        element={<MovieDetailPage />}
      />
    </Routes>
  );
}

export default App;