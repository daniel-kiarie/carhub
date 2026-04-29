import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../../components/cars/CarCard";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ make: [], type: [], year: [] });
  const [priceRange, setPriceRange] = useState([0, 90000000]);
  const [appliedFilters, setAppliedFilters] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const toggleFilter = (group, value) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((v) => v !== value)
        : [...prev[group], value],
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ filters, priceRange });
  };

  const handleClearFilters = () => {
    setFilters({ make: [], type: [], year: [] });
    setPriceRange([0, 90000000]);
    setAppliedFilters(null);
  };

  const yearRangeMatch = (carYear, rangeLabel) => {
    const y = parseInt(carYear);
    if (rangeLabel === "Pre-2010") return y < 2010;
    if (rangeLabel === "2010–2015") return y >= 2010 && y <= 2015;
    if (rangeLabel === "2016–2020") return y >= 2016 && y <= 2020;
    if (rangeLabel === "2021+") return y >= 2021;
    return true;
  };

  const filteredCars = cars.filter((car) => {
    // Search
    const matchesSearch =
      car.brand?.toLowerCase().includes(search.toLowerCase()) ||
      car.model?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    // Only apply filter chips & price when user has clicked "Apply"
    if (!appliedFilters) return true;

    const { filters: af, priceRange: ap } = appliedFilters;

    const matchesMake =
      af.make.length === 0 ||
      af.make.some((m) => car.brand?.toLowerCase() === m.toLowerCase());

    const matchesType =
      af.type.length === 0 ||
      af.type.some((t) => car.bodyType?.toLowerCase() === t.toLowerCase());

    const matchesYear =
      af.year.length === 0 ||
      af.year.some((yr) => yearRangeMatch(car.year, yr));

    const matchesPrice = car.price >= ap[0] && car.price <= ap[1];

    return matchesMake && matchesType && matchesYear && matchesPrice;
  });

  if (loading)
    return <div className="text-center p-10">Loading Nairobi Inventory...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit space-y-6">
          <h3 className="font-bold text-lg">Filters</h3>

          {/* Make */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Make
            </p>
            <div className="flex flex-wrap gap-2">
              {["Porsche", "Volkswagen", "BMW", "Mercedes-Benz"].map((make) => (
                <button
                  key={make}
                  onClick={() => toggleFilter("make", make)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    filters.make.includes(make)
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {make}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Body Type */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Body Type
            </p>
            <div className="flex flex-wrap gap-2">
              {["Sedan", "Truck", "Sports car", "SUV"].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter("type", type)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    filters.type.includes(type)
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Year */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Year
            </p>
            <div className="flex flex-wrap gap-2">
              {["Pre-2010", "2010–2015", "2016–2020", "2021+"].map((yr) => (
                <button
                  key={yr}
                  onClick={() => toggleFilter("year", yr)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    filters.year.includes(yr)
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Price Range */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Price Range
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Min (KES)</label>
                <input
                  type="number"
                  min={0}
                  step={100000}
                  placeholder="0"
                  value={priceRange[0] === 0 ? "" : priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value || 0, priceRange[1]])
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Max (KES)</label>
                <input
                  type="number"
                  min={0}
                  step={100000}
                  placeholder="90,000,000"
                  value={priceRange[1] === 90000000 ? "" : priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], +e.target.value || 90000000])
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition"
          >
            Clear all
          </button>
        </aside>

        {/* Search & Grid */}
        <div className="w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search by brand or model..."
            className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">
              No cars match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
