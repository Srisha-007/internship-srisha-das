import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <FavoritesProvider>
      <ScrollToTop />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage />} 
          />

          <Route
            path="/movie/:id"
            element={<MovieDetailPage />}
          />
        
          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />
        </Routes>
    </FavoritesProvider>
  );
}

export default App;