import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { getWeatherData } from './services/weatherService';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen weather-bg">
      <div className="weather-overlay min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
              Weather Forecast
            </h1>
            <p className="text-gray-200 text-lg">Discover the weather in your city</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md animate-fade-in">
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>
            
            <div className="w-full max-w-md z-0">
              {loading && (
                <div className="mt-8 glass-effect p-6 rounded-2xl text-white animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-blue-400 border-t-transparent"></div>
                    <span className="text-lg">Fetching weather data...</span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mt-8 glass-effect border-l-4 border-red-400 p-6 rounded-2xl text-white animate-fade-in">
                  <p className="flex items-center text-lg">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
              
              {weather && <WeatherCard weather={weather} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;