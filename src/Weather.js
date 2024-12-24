import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError("Veuillez entrer le nom d'une ville.");
      return;
    }
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=VOTRE_CLE_API&units=metric&lang=fr`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ville non trouvée.");
      }

      const data = await response.json();
      setWeather(data);
      setCity(""); // Réinitialise le champ après une recherche réussie
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Application Météo</h1>
      <input
        type="text"
        placeholder="Entrez une ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "8px", fontSize: "16px", marginLeft: "10px" }}>
        Obtenir la météo
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>Météo pour {weather.name}</h2>
          <p>Température : {weather.main.temp}°C</p>
          <p>Conditions : {weather.weather[0].description}</p>
          <p>Humidité : {weather.main.humidity}%</p>
          <p>Vitesse du vent : {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
