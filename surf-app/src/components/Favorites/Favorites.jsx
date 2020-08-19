import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import apiUrl from "../apiConfig";

const Favorites = (props) => {
  const [favoriteSpot, setFavoriteSpot] = useState({});
  useEffect(() => {
    let urlData = `${apiUrl}/users/${id}`;
  });
  //   const renderSpots = () => {
  //     if (spots == null || spots[0] == null) {
  //       return;
  //     }

  //     return spots.map((spot) => (
  //       <div key={spot.id}>
  //         <Link to={`/messages/${spot.id}`}>{spot.name}</Link>
  //       </div>
  //     ));
  //   };
  return (
    <div>
      <h2 className="favorites-header">Favorites</h2>
    </div>
  );
};

export default Favorites;
