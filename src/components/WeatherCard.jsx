import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDust, WiHumidity, WiStrongWind, WiFog, WiDayHaze } from 'react-icons/wi';

const WeatherCard = ({ weather }) => {
  const getWeatherInfo = (code) => {
    if (code === 0) return { icon: <WiDaySunny className="text-8xl text-yellow-300" />, desc: "Clear Sky" };
    if (code <= 3) return { icon: <WiCloudy className="text-8xl text-gray-300" />, desc: "Partly Cloudy" };
    if (code <= 67) return { icon: <WiRain className="text-8xl text-blue-300" />, desc: "Rainy" };
    if (code <= 77) return { icon: <WiSnow className="text-8xl text-blue-100" />, desc: "Snow" };
    if (code <= 85) return { icon: <WiFog className="text-8xl text-gray-400" />, desc: "Foggy" };
    if (code <= 95) return { icon: <WiDayHaze className="text-8xl text-gray-300" />, desc: "Hazy" };
    return { icon: <WiDust className="text-8xl text-gray-400" />, desc: "Severe Weather" };
  };

  const getTemperatureClass = (temp) => {
    if (temp >= 30) return 'temp-hot';
    if (temp >= 25) return 'temp-warm';
    if (temp >= 20) return 'temp-mild';
    if (temp >= 15) return 'temp-cool';
    if (temp >= 5) return 'temp-cold';
    return 'temp-freezing';
  };

  const weatherInfo = getWeatherInfo(weather.weatherCode);
  
  return (
    <div className="weather-card rounded-3xl p-8 mt-8 w-full max-w-md mx-auto animate-fade-in transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="sm:w-1/2 text-center sm:text-left">
          <h2 className={`text-4xl sm:text-6xl font-bold mb-2 ${getTemperatureClass(weather.temperature)}`}>
            {weather.temperature}°C
          </h2>
          <p className="text-lg sm:text-2xl text-gray-300 font-medium">{weather.city}</p>
          <p className="text-sm sm:text-lg text-gray-400 mt-1">{weatherInfo.desc}</p>
        </div>
        <div className="mt-6 sm:mt-0 sm:w-1/3 transform hover:scale-110 transition-transform duration-300">
          {weatherInfo.icon}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center space-x-3 mb-2">
            <WiHumidity className="text-4xl text-blue-400" />
            <p className="text-gray-300 font-medium text-lg">Humidity</p>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-blue-300">{weather.humidity}%</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center space-x-3 mb-2">
            <WiStrongWind className="text-4xl text-teal-400" />
            <p className="text-gray-300 font-medium text-lg">Wind</p>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-teal-300">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
