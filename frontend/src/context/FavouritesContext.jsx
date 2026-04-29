import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const FavouritesContext = createContext();

// const API = "http://localhost:5000";
const API = "https://carhub-269k.onrender.com";

export const FavouritesProvider = ({ children }) => {
  const { user, authReady } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const pending = useRef(new Set());
  const userRef = useRef(user); // ← keep a fresh ref to user

  useEffect(() => {
    userRef.current = user; // ← update ref whenever user changes
  }, [user]);

  useEffect(() => {
    if (!authReady) return;

    if (!user?.token) {
      setFavourites([]);
      return;
    }

    axios
      .get(`${API}/api/favourites`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : [];
        const carObjects = data.map((fav) => fav.car ?? fav).filter(Boolean);
        setFavourites(carObjects);
      })
      .catch((err) => {
        console.error("Error fetching favourites:", err);
        setFavourites([]);
      });
  }, [user?.token, authReady]);

  const isFavourited = useCallback(
    (carId) => favourites.some((c) => c._id === carId),
    [favourites],
  );

  const toggleFavourite = useCallback(
    async (car) => {
      const currentUser = userRef.current; // ← always fresh, no stale closure
      if (!currentUser?.token) {
        alert("Please login to save favourites");
        return;
      }

      if (pending.current.has(car._id)) return;
      pending.current.add(car._id);

      const already = isFavourited(car._id);

      setFavourites((prev) =>
        already ? prev.filter((c) => c._id !== car._id) : [...prev, car],
      );

      try {
        const res = await axios.post(
          `${API}/api/favourites/${car._id}`,
          {},
          { headers: { Authorization: `Bearer ${currentUser.token}` } },
        );
        if (res.data.isFavourite && !already) return;
        if (!res.data.isFavourite && already) return;
        setFavourites((prev) =>
          already ? [...prev, car] : prev.filter((c) => c._id !== car._id),
        );
      } catch (err) {
        console.error("Failed to toggle favourite:", err);
        setFavourites((prev) =>
          already ? [...prev, car] : prev.filter((c) => c._id !== car._id),
        );
      } finally {
        pending.current.delete(car._id);
      }
    },
    [isFavourited], // ← user?.token removed from deps, using ref instead
  );

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourited, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);