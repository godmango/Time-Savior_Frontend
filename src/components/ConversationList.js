import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/actions/user.actions";
import { Container } from "react-bootstrap";

const ConversationList = ({ onlineUsers }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.auth.theme);

  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(userActions.usersRequest());
  }, []);
  // console.log("off or on", onlineUsers);
  return (
    <Container className={`onOffUsers${currentTheme}`}>
      {users.map((user) => (
        <div key={user._id}>
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
