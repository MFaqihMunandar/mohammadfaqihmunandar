import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState('Jakarta');
  const [searchQuery, setSearchQuery] = useState('Jakarta');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      // Step 1: Geocoding API to get latitude and longitude
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Kota tidak ditemukan.');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Open-Meteo Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        cityName: `${name}, ${country}`,
        temp: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError(err.message || 'Gagal mengambil data cuaca.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Jakarta');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCity(searchQuery);
      fetchWeather(searchQuery);
    }
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">🌤️ Informasi Cuaca Realtime</h4>
      <p className="text-muted small mb-3">
        Aplikasi cuaca menggunakan Open-Meteo REST API (Tanpa API Key/Backend).
      </p>

      <form onSubmit={handleSearch} className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan nama kota (contoh: Bandung, Tokyo)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary px-4" disabled={loading}>
          {loading ? 'Memuat...' : 'Cari'}
        </button>
      </form>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {weather && !loading && (
        <div className="card bg-light border-0 p-4 text-center rounded-3">
          <h5 className="fw-bold text-dark mb-1">{weather.cityName}</h5>
          <div className="display-3 fw-bold my-2 text-primary">{weather.temp}°C</div>
          <div className="d-flex justify-content-center gap-4 text-secondary mt-2">
            <span>💨 Kecepatan Angin: <strong>{weather.windspeed} km/h</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}