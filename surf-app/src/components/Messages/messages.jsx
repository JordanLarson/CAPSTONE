import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import apiUrl from "../apiConfig";
import PropTypes from "prop-types";
import "./messages.css";

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
  let globalSpotId = 0;
  let globalSender = "";

  console.log("props: " + props);

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

  const renderChat = () => {
    return chat.map(({ sender, message }, index) => (
      <div key={index}>
        <h3>
          {sender}: <span>{message}</span>
        </h3>
      </div>
    ));
  };
  const { classes } = props;
  return (
    <div className="message-card">
      <h1 className="chat-log-title">Post On Feed</h1>

      <div className="render-chat">{renderChat()}</div>
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
    </div>
  );
}
// Messages.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default Messages;
