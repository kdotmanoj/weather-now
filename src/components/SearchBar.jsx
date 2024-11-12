import React, { useState } from 'react';
import { searchCities } from '../services/weatherService';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return; 

    setLoading(true);
    try {
      const cities = await searchCities(query.trim());
      if (cities.length > 0) {
        setQuery(cities[0].fullName);
        onSearch(cities[0].fullName);  
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="glass-effect flex items-center rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter city name..."
            className="w-full px-6 py-5 bg-transparent text-white placeholder-gray-300 focus:outline-none text-lg"
            autoComplete="off"
          />
          <button
            type="submit"
            className="px-8 py-5 bg-blue-500/30 text-white font-semibold hover:bg-blue-600/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent text-lg"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="absolute right-20 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
