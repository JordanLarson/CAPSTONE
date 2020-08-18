import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import apiUrl from "../apiConfig";
import PropTypes from "prop-types";
import "./Messages.css";
import { FaTrashAlt } from "react-icons/fa";

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
  let globalSpotId = 0;
  let globalSender = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setFavorite(true);
  };
  useEffect(() => {
    const makeApiCall = async () => {
      const response = await axios(
        `${apiUrl}/spots/${props.location.pathname.split("/")[2]}`
      );
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
    };
    makeApiCall();
  }, []);

  useEffect(() => {
    globalSpotId = props.location.pathname.split("/")[2];
    globalSender = document.cookie.split("=")[1];
    setSpotId(globalSpotId);
    setSender(globalSender);

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
  // const deleteMessage = async () => {
  //   const response = await axios({
  //     url: `${apiUrl}/feed/${chatItem._id}`,
  //   });
  // };

  const renderChat = () => {
    return chat.map((chatItem, index) => (
      <div key={index}>
        <h3>
          {chatItem.sender}: <span>{chatItem.message}</span>
          <button
            onClick={() => axios.delete(`${apiUrl}/feed/${chatItem._id}`)}
          >
            <FaTrashAlt />
          </button>
        </h3>
      </div>
    ));
  };
  const { classes } = props;
  return (
    <div className="message-card">
      <div>
        <h4>Wave Statistics</h4>
        <p>Maximum wave height: {maxWaveHeight} feet</p>
        <p>Minimum Wave Height: {minWaveHeight} feet</p>
        <p>
          Swell: {waveHeight} feet at {wavePeriod} seconds - {swellDirection}
        </p>
        <p>Current Water Temp: {waterTemp} farhenheit</p>
        <p>
          Wind Speed/Direction: {windSpeed} - {windDirection}
        </p>
        <p>Solid Rating: {solidRating}/5</p>
        <img src={swellChart}></img>
        <img src={windChart}></img>
      </div>

      <h1 className="chat-log-title">Post On Feed</h1>
      <form onSubmit={onMessageSubmit} className="message-form-ctn">
        <div className="textfield-ctn">
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="filled-secondary"
            variant="filled"
            label="Message"
            color="secondary"
            // className={classes.root}
            // InputProps={{
            //   className: classes.input,
            // }}
          />
        </div>
        <button className="postButton">Post</button>
      </form>
      <div className="render-chat">{renderChat()}</div>
    </div>
  );
}
// Messages.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default Messages;
