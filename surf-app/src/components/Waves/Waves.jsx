import React, { useState, useEffect } from "react";
import axios from "axios";
import cors from "cors";
import { Link } from "react-router-dom";

const Waves = (props) => {
  const [maxWaveHeight, setMaxWaveHeight] = useState("");
  const [minWaveHeight, setMinWaveHeight] = useState("");
  const [waveHeight, setWaveHeight] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [solidRating, setSolidRating] = useState("");
  const [wavePeriod, setWavePeriod] = useState("");
  const [swellDirection, setSwellDirection] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [spotId, setSpotId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFavorite(true);
  };
  useEffect(() => {
    const makeApiCall = async () => {
      const urlData = `http://magicseaweed.com/api/66c79af0fe4e3fb73b3915ea2ef63999/forecast/?spot_id=291`;
      const res = await fetch(urlData);
      const data = await res.json();
      console.log(data[0]);
      setMaxWaveHeight(data[0].swell.absMaxBreakingHeight);
      setMinWaveHeight(data[0].swell.absMinBreakingHeight);
      setWaterTemp(data[0].condition.temperature);
      setSolidRating(data[0].solidRating);
      setWaveHeight(data[0].swell.components.combined.height);
      setWavePeriod(data[0].swell.components.combined.period);
      setSwellDirection(data[0].swell.components.combined.compassDirection);
    };
    makeApiCall();
  }, []);
  return (
    <div>
      <h3>Waves Nearby</h3>
      <p>Maximum wave height: {maxWaveHeight} feet</p>
      <p>Minimum Wave Height: {minWaveHeight} feet</p>
      <p>
        Swell: {waveHeight} feet at {wavePeriod} seconds -{swellDirection}
      </p>
      <p>Current Water Temp: {waterTemp} farhenheit</p>
      <p>Solid Rating: {solidRating}/5</p>
      <button onClick={handleSubmit}>
        <span>Add To Your Waves</span>
        {/* <p>data[1].swell.absMaxBreakingHeight</p> */}
      </button>
      <div className="chat_container">
        <Link to={`/messages/291`}>Location Feed</Link>
      </div>
    </div>
  );
};
export default Waves;
