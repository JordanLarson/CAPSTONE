import React, { useState, useEffect } from "react";

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
      const urlData =
        "http://magicseaweed.com/api/66c79af0fe4e3fb73b3915ea2ef63999/forecast/?spot_id=10";
      const res = await fetch(urlData);
      const data = await res.json();
      console.log(data);
      setWaves(data.value);
    };
    makeApiCall();
  }, []);
  return (
    <div>
      <h3>Waves Nearby</h3>
      <button onClick={handleSubmit}>
        <span>Add To Favorites</span>
      </button>
    </div>
  );
};
export default Waves;
