import React, { useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import ConversationList from "./ConversationList";
import Message from "./Message";
import { socketTypes } from "../config/constants.js";
import { toast } from "react-toastify";

import socketIOClient from "socket.io-client";
import TodoList from "./TodoList";
let socket;

const GlobalChat = () => {
  const [globalMessages, setGlobalMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentTheme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loading = useSelector((state) => state.user.loading);

  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentUser = useSelector((state) => state.auth.user);

  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  useEffect(() => {
    if (accessToken) {
      socket = socketIOClient(process.env.REACT_APP_BACKEND_API, {
        query: { accessToken },
      });
      socket.emit(socketTypes.GLOBAL_MSG_INIT);
    } else if (!accessToken) {
      socket = socketIOClient(process.env.REACT_APP_BACKEND_API, {
        query: null,
      });
      socket.emit(socketTypes.GLOBAL_MSG_INIT);
    }
  }, [accessToken]);

  useEffect(() => {
    // let testingSomething = currentUser._id
    // let totalCurrentUsers =
    if (isAuthenticated === false) {
      setOnlineUsers([]);
    }
  }, [isAuthenticated]);

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit(socketTypes.GLOBAL_MSG_SEND, {
      from: currentUser._id,
      body: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    if (socket) {
      socket.on(socketTypes.NOTIFICATION, (data) => {
        if (data.onlineUsers) {
          if (data.onlineUsers === ["no user"]) {
            setOnlineUsers([]);
          } else {
            setOnlineUsers(data.onlineUsers);
          }
        }
        if (data.globalMessages) {
          setGlobalMessages(data.globalMessages);
        }
        if (data.globalMsg) {
          setGlobalMessages((globalMessages) => [
            ...globalMessages,
            data.globalMsg,
          ]);
        }

        if (data.receivedMessage) {
          toast.info(
            `${data.receivedMessage.user.name} has sent you a message`
          );
        }
      });
    }
  }, []);

  return (
    <div className="globalBig">
      <TodoList />
      <div className={`conversationBox${currentTheme}`}>
        <div className={`conversationBoxSmallOne${currentTheme}`}>
          <h5 className="fontChange">Global Chat</h5>
          <h6 className="usersOnline">
            {onlineUsers && (
              <div className="fontChange">
                {onlineUsers.length < 2
                  ? onlineUsers.length + " user online"
                  : onlineUsers.length + " users online"}
              </div>
            )}
          </h6>
        </div>

        <ConversationList onlineUsers={onlineUsers} />
      </div>
      <Col className="chatBox">
        <ScrollToBottom className={`globalBox${currentTheme} messages `}>
          <ul className="list-unstyled">
            {globalMessages.map((msg) => (
              <Message key={msg._id} msg={msg} />
            ))}
          </ul>
        </ScrollToBottom>
        <div>
          <Form onSubmit={handleSendMessage}>
            <Form.Row>
              <Col>
                {isAuthenticated ? (
                  <Form.Control
                    type="text"
                    required
                    placeholder="Type something.."
                    name="newMessage"
                    value={newMessage}
                    onChange={handleChangeMessage}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    required
                    placeholder="Please login before joining global chat"
                    name="newMessage"
                    value="Please login before joining global chat"
                    disabled={true}
                  />
                )}
              </Col>
              <button
                className="buttonHover"
                type="submit"
                disabled={loading || !newMessage || isAuthenticated === false}
              >
                Send
              </button>
            </Form.Row>
          </Form>
        </div>
      </Col>
    </div>
  );
};

export default GlobalChat;
