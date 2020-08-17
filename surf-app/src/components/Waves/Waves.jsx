import React, { useState, useEffect } from "react";
import axios from "axios";
import cors from "cors";
import { Link } from "react-router-dom";

const Waves = (props) => {
  const [waves, setWaves] = useState("");
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
      console.log(data[1].swell.absMaxBreakingHeight);
      setWaves(data[1].swell.absMaxBreakingHeight);
    };
    makeApiCall();
  }, []);
  return (
    <div>
      <h3>Waves Nearby</h3>
      <p>wave height: {waves}</p>
      <button onClick={handleSubmit}>
        <span>Add To Your Waves</span>
        {/* <p>data[1].swell.absMaxBreakingHeight</p> */}
      </button>
      <div className="chat_container">
        <Link to={`/messages/`}>Location Feed</Link>
      </div>
    </div>
  );
};
export default Waves;
