import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import apiUrl from "../apiConfig";
import PropTypes from "prop-types";
import "./Messages.css";
import { FaTrashAlt, FaHeart } from "react-icons/fa";

const styles = {
  root: {
    background: "gray",
  },
  input: {
    color: "blue",
  },
};
function Messages(props) {
  const [state, setState] = useState({ message: "", username: "" });
  const [chat, setChat] = useState([]);
  const [sender, setSender] = useState("");
  const [senderId, setSenderId] = useState("");
  const [spotId, setSpotId] = useState(0);
  const [surfSpot, setSurfSpot] = useState("");
  const [isDeleted, setIsDeleted] = useState("");
  console.log("props: " + props);
  const [maxWaveHeight, setMaxWaveHeight] = useState("");
  const [minWaveHeight, setMinWaveHeight] = useState("");
  const [waveHeight, setWaveHeight] = useState("");
  const [waterTemp, setWaterTemp] = useState("");
  const [solidRating, setSolidRating] = useState("");
  const [wavePeriod, setWavePeriod] = useState("");
  const [swellDirection, setSwellDirection] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [swellChart, setSwellChart] = useState("");
  const [windChart, setWindChart] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [favoriteButtonImg, setFavoriteButtonImg] = useState(
    "https://img.icons8.com/material-outlined/100/000000/like.png"
  );
  let globalSpotId = 0;
  let globalSender = "";
  let globalSenderId = 0;

  useEffect(() => {
    const cookies = document.cookie.split("; ");

    globalSpotId = props.location.pathname.split("/")[2];
    globalSender = cookies
      .filter((cookie) => cookie.startsWith("username"))[0]
      .split("=")[1];
    globalSenderId = cookies
      .filter((cookie) => cookie.startsWith("userid"))[0]
      .split("=")[1];
    setSpotId(globalSpotId);
    setSender(globalSender);
    setSenderId(globalSenderId);

    const makeApiCall = async () => {
      const response = await axios(`${apiUrl}/spots/${globalSpotId}`);
      setMaxWaveHeight(response.data.report.swell.maxBreakingHeight);
      setMinWaveHeight(response.data.report.swell.minBreakingHeight);
      setWaterTemp(response.data.report.condition.temperature);
      setSolidRating(response.data.report.solidRating);
      setWaveHeight(response.data.report.swell.components.combined.height);
      setWavePeriod(response.data.report.swell.components.combined.period);
      setSwellDirection(
        response.data.report.swell.components.combined.compassDirection
      );
      setWindSpeed(response.data.report.wind.speed);
      setWindDirection(response.data.report.wind.compassDirection);
      setSwellChart(response.data.report.charts.swell);
      setWindChart(response.data.report.charts.wind);

      const userResponse = await axios(`${apiUrl}/users/${globalSenderId}`);
      const userFavorites = userResponse.data.user.favorites;

      console.log("just before if check");
      if (userFavorites.includes(parseInt(globalSpotId))) {
        console.log("about to set the favorite state to true");
        setFavorite(true);
        setFavoriteButtonImg(
          "https://img.icons8.com/material-rounded/100/000000/like.png"
        );
      }
    };
    makeApiCall();

    const interval = setInterval(() => getNewMessages(spotId), 1000);

    return function cleanup() {
      console.log("use effect cleanup was called");
      clearInterval(interval);
    };
  }, []);
  const getNewMessages = async (theSpot) => {
    try {
      const response = await axios(`${apiUrl}/feed?spotId=${globalSpotId}`);
      console.log(JSON.stringify(response));
      console.log("message id:", response.data.feed);
      setChat(response.data.feed.reverse());
    } catch (err) {
      console.error(err);
    }
  };
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;

    const postMessageAPI = async (message) => {
      try {
        const jsonBody = {
          message: message,
          sender: sender,
          spotId: spotId,
        };
        const response = await axios.post(`${apiUrl}/feed`, jsonBody);
      } catch (err) {
        console.error(err);
      }
    };
    postMessageAPI(message);

    setState({ message: "", name });
  };
  const renderMedia = (message) => {
    if (message.endsWith(".jpg") || message.endsWith(".gif")) {
      return <img src={message}></img>;
    } else {
      return <span className="message-render-span">{message}</span>;
    }
  };

  const renderChat = () => {
    return chat.map((chatItem, index) => (
      <div className="render-chat-div" key={index}>
        <h3 className="chat-log-container">
          {chatItem.sender}: {renderMedia(chatItem.message)}
          <button
            className="fa-trash-button"
            onClick={() => axios.delete(`${apiUrl}/feed/${chatItem._id}`)}
          >
            <FaTrashAlt />
          </button>
        </h3>
      </div>
    ));
  };

  const handleFavorite = async (e) => {
    e.preventDefault();

    const response = await axios(`${apiUrl}/users/${senderId}`);
    const user = response.data.user;

    if (!user.favorites.includes(parseInt(spotId))) {
      setFavoriteButtonImg(
        "https://img.icons8.com/material-rounded/100/000000/like.png"
      );
      user.favorites.push(spotId);
      const putResponse = await axios.put(`${apiUrl}/users/${senderId}`, user);
    } else {
      setFavoriteButtonImg(
        "https://img.icons8.com/material-outlined/100/000000/like.png"
      );
      const index = user.favorites.indexOf(parseInt(spotId));
      user.favorites.splice(index, 1);
      const putResponse = await axios.put(`${apiUrl}/users/${senderId}`, user);
    }
  };

  const { classes } = props;
  return (
    <div className="message-card">
      <img src={favoriteButtonImg} onClick={handleFavorite}></img>
      <div className="wave-statistics">
        <h4>Wave Statistics</h4>
        <p>Maximum wave height: {maxWaveHeight} feet</p>
        <p>Minimum Wave Height: {minWaveHeight} feet</p>
        <p>
          Swell: {waveHeight} feet at {wavePeriod} seconds
        </p>
        <p>Swell Direction: {swellDirection}</p>
        <p>Current Water Temp: {waterTemp} degrees farhenheit</p>
        <p>
          Wind Speed/Direction: {windSpeed} - {windDirection}
        </p>
        <p>Solid Rating: {solidRating}/5</p>
        <p>Swell Chart:</p>
        <img src={swellChart}></img>
        <p>Wind Chart:</p>
        <img src={windChart}></img>
      </div>

      <h1 className="chat-log-title">Post On Feed</h1>
      <form onSubmit={onMessageSubmit} className="message-form-ctn">
        <div className="textfield-container">
          <TextField
            className="textfield-container"
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="filled-secondary"
            variant="filled"
            label="Message"
            color="#00a8e8"
          />
        </div>
        <button className="chat-post-button">Post To Feed</button>
      </form>
      <div className="render-chat">{renderChat()}</div>
    </div>
  );
}

export default Messages;
