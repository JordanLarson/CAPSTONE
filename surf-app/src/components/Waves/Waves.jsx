import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../apiConfig";
import ReactStars from "react-stars";
import "./Waves.css";

const Waves = (props) => {
  const [spots, setSpots] = useState({});
  const [region, setRegion] = useState("");
  const [waveHeight, setWaveHeight] = useState(null);
  const [stars, setStars] = useState(null);

  useEffect(() => {
    let urlData = `${apiUrl}/spots?region=${region}`;
    if (waveHeight != null) {
      urlData += `&waveHeight=${waveHeight}`;
    }
    if (stars != null) {
      urlData += `&stars=${stars}`;
    }

    const makeApiCall = async () => {
      const res = await fetch(urlData);
      const data = await res.json();
      setSpots(data);
    };
    makeApiCall();
  }, [region, waveHeight, stars]);

  const handleWaveHeightChange = (e) => {
    e.preventDefault();

    setWaveHeight(e.target.value);
    console.log(waveHeight);
  };

  const handleRegionChange = (e) => {
    e.preventDefault();
    setRegion(e.target.value);
    console.log(region);
  };

  const handleStarsChange = (e) => {
    if (stars === e) {
      setStars(null);
    } else {
      setStars(e);
    }
  };

  const renderSpots = () => {
    if (spots == null || spots[0] == null) {
      return;
    }

    return spots.map((spot) => (
      <div key={spot.id}>
        <Link to={`/messages/${spot.id}`}>{spot.name}</Link>
      </div>
    ));
  };

  return (
    <div>
      <h4 className="wave-component-header">
        SEARCH FOR <br></br>YOUR OPTIMAL LOCATION
      </h4>
      <select className="region-dropdown" onChange={handleRegionChange}>
        <option value="Select Region">Select Region</option>
        <option value="Northern California">Northern California</option>
        <option value="San Diego County">San Diego County</option>
      </select>
      <p className="wave-height-slider">
        Select Your Desired Wave Height {waveHeight}
      </p>
      <input
        id="wave-height-slider"
        type="range"
        min="0"
        max="20"
        value={waveHeight}
        onChange={handleWaveHeightChange}
        step="1"
      />
      {/* https://github.com/n49/react-stars */}
      <ReactStars
        className="react-stars"
        count={5}
        value={stars}
        onChange={handleStarsChange}
        size={24}
        half={false}
        color2={"#ffd700"}
      />
      <h3 className="spots-header">
        Spots In Your Region<br></br>That Fit Your Criteria
      </h3>
      <ul style={{ textDecoration: "none" }} className="render-spots">
        {renderSpots()}
      </ul>
    </div>
  );
};
export default Waves;
