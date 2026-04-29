import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';
import CarCard from '../../components/cars/CarCard';
import { Heart, ArrowLeft } from 'lucide-react';

const Favourites = () => {
  const { favourites } = useFavourites();
  console.log("favourites:", favourites);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your Saved Cars</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {favourites.length} {favourites.length === 1 ? 'vehicle' : 'vehicles'} saved
          </p>
        </div>
      </div>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favourites.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-50 rounded-full">
              <Heart className="w-8 h-8 text-red-300" />
            </div>
          </div>
          <p className="text-lg font-semibold text-slate-700">No saved cars yet</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">
            Tap the heart icon on any listing to save it here.
          </p>
          <button
            onClick={() => navigate('/cars')}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Browse Inventory
          </button>
        </div>
      )}
    </div>
  );
};

export default Favourites;