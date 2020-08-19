import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiConfig";
import "./Favorites.css";

const Favorites = (props) => {
  const [favoriteSpot, setFavoriteSpot] = useState({});
  const [region, setRegion] = useState("");
  const [spots, setSpots] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    setUserId(
      cookies.filter((cookie) => cookie.startsWith("userid"))[0].split("=")[1]
    );

    const makeApiCall = async () => {
      const response = await axios(`${apiUrl}/users/${userId}`);
      const favorites = response.data.user.favorites;

      //inspired by tutorial at https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map
      const promises = favorites.map(async (spot_id) => {
        const spot = await axios(`${apiUrl}/spots/${spot_id}`);

        return {
          id: spot.data.id,
          name: spot.data.name,
          region: spot.data.region,
        };
      });

      const results = await Promise.all(promises);
      console.log("results", results);
      console.log("region", region);
      const filteredResults = results.filter(
        (result) => result.region == region
      );
      console.log("filteredResults", filteredResults);

      setSpots(filteredResults);
    };
    makeApiCall();
  }, [region]);

  const handleRegionChange = (e) => {
    e.preventDefault();
    setRegion(e.target.value);
    console.log(region);
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
      <h2 className="favorites-header">Your Favorite Surf Breaks</h2>
      <select className="region-dropdown" onChange={handleRegionChange}>
        <option value="Select Region">Select Region</option>
        <option value="Northern California">Northern California</option>
        <option value="San Diego County">San Diego County</option>
      </select>
      <ul style={{ textDecoration: "none" }} className="render-spots">
        {renderSpots()}
      </ul>
    </div>
  );
};

export default Favorites;
