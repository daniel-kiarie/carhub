import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layouts/Navbar";
import { FavouritesProvider } from './context/FavouritesContext';

function App() {
  return (
    <FavouritesProvider>
      <Router>
        <AuthProvider>
          {" "}
          {/* Ensure AuthProvider is inside the Router if it uses navigation */}
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="grow flex items-center justify-center">
              <AppRoutes />
            </main>
          </div>
        </AuthProvider>
      </Router>
    </FavouritesProvider>
  );
}

export default App;
