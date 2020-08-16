import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import apiUrl from "../apiConfig";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  root: {
    background: "gray",
  },
  input: {
    color: "blue",
  },
};
function Message(props) {
  const [state, setState] = useState({ message: "", username: "" });
  const [chat, setChat] = useState([]);
  const [postSender, setPostSender] = useState("");
  const [surfSpot, setSurfSpot] = useState("");
  let readSender = "";
  let readRecipient = "";

  useEffect(() => {
    readSender = document.cookie.split("=")[1];
    readRecipient = props.match.params.spotId;
    setPostSender(document.cookie.split("=")[1]);
    setSurfSpot(props.match.params.spotId);
  }, []);
  const getNewMessages = async (e) => {
    try {
      const response = await axios(
        `${apiUrl}/messages?sender=${readSender}&recipient=${readRecipient}`
      );
      setChat(response.data.messages.reverse());
    } catch (err) {
      console.error(err);
    }
  };
  const onTextChange = (e) => {
    setState({ ...state, [e.target.username]: e.target.value });
  };
  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;

    const postMessage = async (message) => {
      try {
        const jsonBody = {
          message: message,
          sender: postSender,
          recipient: surfSpot,
        };
        const response = await axios.post(`${apiUrl}/messages`, jsonBody);
      } catch (err) {
        console.error(err);
      }
    };
    postMessage(message);

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
    <div>
      <h1>Post On Feed</h1>

      <div>{renderChat()}</div>
      <form onSubmit={onMessageSubmit}>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="filled-secondary"
            variant="filled"
            label="Message"
            color="secondary"
            className={classes.root}
            InputProps={{
              className: classes.input,
            }}
          />
        </div>
        <button className="postButton">Post</button>
      </form>
    </div>
  );
}
Message.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Message);
