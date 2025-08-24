// Replace with your WeatherAPI.com key
const API_KEY = "6ca3d8fb1cab41b9ac6202204252108";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

// Elements
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const unitsSelect = document.getElementById("units-select");
const statusBox = document.getElementById("status");

const card = document.getElementById("result");
const cityNameEl = document.getElementById("city-name");
const updatedTimeEl = document.getElementById("updated-time");
const iconEl = document.getElementById("icon");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");
const feelsEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

function showStatus(msg, isError = false) {
  statusBox.textContent = msg;
  statusBox.style.color = isError ? "#fca5a5" : "#9ca3af";
}

function unitLabels(units) {
  return units === "imperial"
    ? { temp: "°F", speed: "mph", pressure: "mb" } // WeatherAPI returns pressure_mb
    : { temp: "°C", speed: "kph", pressure: "mb" };
}

async function getWeather(query, units = "metric") {
  // WeatherAPI supports "q" as city name, lat,long, IP, etc.
  // We always ask for both C and F by using the response fields.
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error (${res.status}): ${text || res.statusText}`);
  }
  const data = await res.json();
  // WeatherAPI may return error JSON with 200 OK
  if (data && data.error) {
    throw new Error(`${data.error.code}: ${data.error.message}`);
  }
  return data;
}

function renderWeather(data, units) {
  const loc = data.location;
  const cur = data.current;

  // Units mapping
  const isImperial = units === "imperial";
  const labels = unitLabels(units);

  const temp = isImperial ? cur.temp_f : cur.temp_c;
  const feels = isImperial ? cur.feelslike_f : cur.feelslike_c;
  const wind = isImperial ? cur.wind_mph : cur.wind_kph;
  const pressure = cur.pressure_mb; // Provided in millibars
  const humidity = cur.humidity;
  const desc = cur.condition?.text ?? "N/A";
  const icon = cur.condition?.icon; // Already a full URL starting with //cdn.weatherapi.com

  const cityTitle = [loc.name, loc.region, loc.country].filter(Boolean).join(", ");
  cityNameEl.textContent = cityTitle;

  // localtime is already local; also show last_updated
  updatedTimeEl.textContent = `Updated: ${cur.last_updated} (Local: ${loc.localtime})`;

  iconEl.src = icon?.startsWith("//") ? `https:${icon}` : icon || "";
  iconEl.alt = desc;

  tempEl.textContent = `${Math.round(temp)}${labels.temp}`;
  descEl.textContent = desc;

  feelsEl.textContent = `${Math.round(feels)}${labels.temp}`;
  humidityEl.textContent = `${humidity}%`;
  windEl.textContent = `${Math.round(wind)} ${labels.speed}`;
  pressureEl.textContent = `${Math.round(pressure)} ${labels.pressure}`;

  card.classList.remove("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  const units = unitsSelect.value;

  if (!city) {
    showStatus("Please enter a city name.", true);
    return;
  }

  showStatus("Fetching weather…");
  card.classList.add("hidden");

  try {
    const data = await getWeather(city, units);
    renderWeather(data, units);
    showStatus("");
  } catch (err) {
    console.error(err);
    const msg = String(err.message || "");
    if (msg.includes("1006")) {
      // No matching location found
      showStatus("City not found. Check the spelling and try again.", true);
    } else if (msg.includes("2006") || msg.includes("API key")) {
      showStatus("Invalid or missing API key. Add a valid WeatherAPI key in script.js.", true);
    } else if (msg.includes("calls per month") || msg.includes("limit")) {
      showStatus("API rate limit reached. Try again later or upgrade your plan.", true);
    } else {
      showStatus("Failed to fetch weather. Please try again.", true);
    }
  }
});

// Optional: sensible default search
window.addEventListener("DOMContentLoaded", () => {
  cityInput.value = "Mumbai";
  form.requestSubmit();
});
