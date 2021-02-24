import React, { useState, useEffect } from "react";
// import SearchItem from "./SearchItem";
// import PaginationItem from "./PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/actions/user.actions";
import { Row, Col, Container, Table, Tabs, Tab, Media } from "react-bootstrap";
import Moment from "react-moment";
import ReactEmoji from "react-emoji";
import { messengerTabNames, conversationTypes } from "../config/constants";

const ConversationList = ({
  onlineUsers,
  handleClickFriend,
  handleClickConversation,
}) => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.user.totalPageNum);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [tabKey, setTabKey] = useState(messengerTabNames.CONVERSATIONS);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.user.loading);
  const users = useSelector((state) => state.user.users);
  const conversations = useSelector((state) => state.user.conversations);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
  };

  const handleChangeTab = (key) => {
    setTabKey(key);
    setPageNum(1);
  };

  // console.log("the online users", onlineUsers);
  useEffect(() => {
    // if (isAuthenticated) {
    dispatch(userActions.usersRequest(pageNum, 20, query));
    // console.log(users);
    // console.log(
    //   "the map thing",
    //   users.map((user) => (
    //     <tr key={user._id}>
    //       <td>
    //         <span>{user.name}</span>
    //         {onlineUsers.includes(user._id) ? (
    //           <span className="text-success"> - online</span>
    //         ) : (
    //           <span className="text-muted"> - offline</span>
    //         )}
    //       </td>
    //     </tr>
    //   ))
    // );
    // }
  }, []);
  // console.log(isAuthenticated ? users : "nobody");
  console.log("off or on", onlineUsers);
  return (
    <Container className="onOffUsers">
      {/* <Row className="mb-2">
        <Col>
          <SearchItem
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
      </Row> */}

      {/* <Tabs activeKey={tabKey} onSelect={(k) => handleChangeTab(k)}>
        <Tab
          eventKey={messengerTabNames.CONVERSATIONS}
          title="Conversations"
        ></Tab>
        <Tab eventKey={messengerTabNames.USERS} title="Users"></Tab>
      </Tabs> */}

      {/* <Table striped bordered className="onOffUsers table-sm">
            <tbody>
              {
                // tabKey === messengerTabNames.USERS
                //   ?

                users.map((user) => (
                  <tr
                    key={user._id}
                    className="mouse-hover"
                    onClick={() => handleClickFriend(user)}
                  >
                    <td>
                      <span>{user.name}</span>
                      {onlineUsers.includes(user._id) ? (
                        <span className="text-success"> - online</span>
                      ) : (
                        <span className="text-muted"> - offline</span>
                      )}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table> */}
      {
        // tabKey === messengerTabNames.USERS
        //   ?

        users.map((user) => (
          <div key={user._id} onClick={() => handleClickFriend(user)}>
            <span className="onOffUserId">{user.name}</span>
            {onlineUsers.includes(user._id) ? (
              <span className={`userIsOnline${currentTheme}`}> - online</span>
            ) : (
              <span> - offline</span>
            )}
          </div>
        ))
      }

      {/* <Row>
        <Col>
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row> */}
    </Container>
  );
};

export default ConversationList;
