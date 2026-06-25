import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/movie/:id"
          element={<MovieDetailPage />}
        />
      </Routes>  
    </FavoritesProvider>
  );
}

export default App;