import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const ConversationList = ({ onlineUsers, handleClickFriend }) => {
  const currentTheme = useSelector((state) => state.auth.theme);

  const users = useSelector((state) => state.user.users);

  return (
    <Container className="onOffUsers">
      {users.map((user) => (
        <div key={user._id} onClick={() => handleClickFriend(user)}>
          <span className="onOffUserId">{user.name}</span>
          {onlineUsers.includes(user._id) ? (
            <span className={`userIsOnline${currentTheme}`}> - online</span>
          ) : (
            <span> - offline</span>
          )}
        </div>
      ))}
    </Container>
  );
};

export default ConversationList;
