import axios from 'axios';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const searchCities = async (query) => {
  try {
    const response = await axios.get(GEOCODING_API, {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json'
      }
    });

    if (!response.data.results) {
      return [];
    }

    return response.data.results.map(city => ({
      name: city.name,
      fullName: `${city.name}, ${city.country}`,
      latitude: city.latitude,
      longitude: city.longitude
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

export const getWeatherData = async (city) => {
  try {
    const geoResponse = await axios.get(GEOCODING_API, {
      params: {
        name: city,
        count: 1,
        language: 'en',
        format: 'json'
      }
    });

    if (!geoResponse.data.results?.length) {
      throw new Error('City not found');
    }

    const { latitude, longitude } = geoResponse.data.results[0];

    const weatherResponse = await axios.get(WEATHER_API, {
      params: {
        latitude,
        longitude,
        current: ['temperature_2m', 'relative_humidity_2m', 'weather_code', 'wind_speed_10m']
      }
    });

    const current = weatherResponse.data.current;

    return {
      city,
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      weatherCode: current.weather_code,
      windSpeed: Math.round(current.wind_speed_10m)
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};