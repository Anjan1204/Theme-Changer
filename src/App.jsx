import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [isLightTime, setIsLightTime] = useState(false);
  const [themeOverride, setThemeOverride] = useState(null); // null = auto, true = light, false = dark
  const [currentTime, setCurrentTime] = useState("");

  const checkTimeTheme = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const isLight = totalMinutes >= 360 && totalMinutes < 1080;
    setIsLightTime(isLight);
  };

  useEffect(() => {
    checkTimeTheme(); // on mount

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      checkTimeTheme();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDarkMode =
    themeOverride === null ? !isLightTime : themeOverride === false;

  const toggleThemeManually = () => {
    if (themeOverride === null) {
      // switch to opposite of current auto mode
      setThemeOverride(!isLightTime);
    } else {
      // reset to auto
      setThemeOverride(null);
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <div className="content">
        <h1 className={`title ${!isDarkMode ? "glow-effect" : ""}`}>
          {isDarkMode ? "🌑 Dark Mode" : "🌞 Light Mode"}
        </h1>

        <p className="description">
          {themeOverride === null
            ? "Auto mode (based on current time)"
            : `Manual mode: ${themeOverride ? "Light" : "Dark"}`}
        </p>

        <button className="theme-button" onClick={toggleThemeManually}>
          🔁 Test Theme Manually
        </button>

        <p className="time-display">🕒 Current Time: {currentTime}</p>
      </div>
    </div>
  );
};

export default App;
