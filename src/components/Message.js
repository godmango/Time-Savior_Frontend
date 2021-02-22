import React from "react";
import { Media } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import ReactEmoji from "react-emoji";

const Message = ({ msg }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.auth.theme);
  return (
    <Media as="li">
      <Media.Body className="text-left">
        <div>
          <span
            className={
              currentUser === null
                ? `messageOffline${currentTheme}`
                : `messageOnline${currentTheme}`
            }
          >
            <strong>@{msg.name}</strong>
          </span>
          <span className="text-secondary ml-2">
            <Moment className={`messageMoment${currentTheme}`} fromNow>
              {msg.createdAt}
            </Moment>
          </span>
        </div>
        <div className="content-body">
          <p>{ReactEmoji.emojify(msg.body)}</p>
        </div>
      </Media.Body>
    </Media>
  );
};

export default Message;
