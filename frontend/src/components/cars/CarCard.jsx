import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  if (!car) return null;

  return (
    <Link to={`/cars/${car._id}`} className="block hover:shadow-lg transition rounded-xl overflow-hidden border border-gray-100 bg-white">
      <img
        src={car.imageUrl}
        alt={car.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{car.title}</h3>
        <p className="text-gray-500 text-sm">{car.brand} · {car.model} · {car.year}</p>
        <p className="text-blue-600 font-bold mt-2">KES {car.price?.toLocaleString()}</p>
        <div className="flex gap-2 mt-2 text-xs text-gray-400">
          <span>{car.fuelType}</span>
          <span>·</span>
          <span>{car.transmission}</span>
          <span>·</span>
          <span>{car.mileage?.toLocaleString()} km</span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;