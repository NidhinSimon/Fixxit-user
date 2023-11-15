import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import axios from "axios";
import { useSelector } from "react-redux";
import { userChats } from "../../../api/chatRequest";
import Conversations from "../Conversations/Conversation";
import Chatbox from "../ChatBox/ChatbOx";
import UserNav from "../../../Pages/UserNav";

const Chat = () => {
  // const socket=io("http://localhost:5000")
  const { userInfo } = useSelector((state) => state.user);

  const userId = userInfo.userExists._id;
  console.log(userId, ">>");
  const [chats, setchats] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [online, setOnline] = useState(null);
  const [sendMessage, setsendMessage] = useState(null);
  const [receiveMessage, setreceiveMessage] = useState(null);
  
  const socket = useRef();
  const scroll=useRef()
  const [unreadMessages, setUnreadMessages] = useState({});


  console.log(chats, ">>");
  useEffect(() => {
    const getchats = async () => {
      const { data } = await userChats(userId);
      setchats(data);
    };
    getchats();
  }, [userInfo]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", userInfo.userExists._id);
    socket.current.on("get-users", (users) => {
      console.log(users, ">>>>>>>>>>>>");
      setOnline(users);
    });
  }, [userInfo]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("datataata", data);
      setreceiveMessage(data);
      setUnreadMessages((prevUnreadMessages) => {
        const updatedUnreadMessages = { ...prevUnreadMessages };
        updatedUnreadMessages[data.chatId] = true;
        return updatedUnreadMessages;
      });
    });
  }, []);


  const handleui=(chat)=>{
    setcurrentchat(chat)
    
    setUnreadMessages((prevUnreadMessages) => {
      const updatedUnreadMessages = { ...prevUnreadMessages };
      updatedUnreadMessages[chat._id] = false;
      return updatedUnreadMessages;
    });
    
      }

  return (
    <>
    <UserNav/>


<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex h-screen">

<div className="w-1/4 bg-yellow-100 border-r p-4">
  <div className="friends-list">
    <h1 className="font-semibold">Your Conversations</h1>
    {chats.map((chat) => (
      <div key={chat._id} className="mt-10" onClick={() => handleui(chat)}>
        <Conversations data={chat} currentUser={userId} receiveMessage={receiveMessage}   unread={unreadMessages[chat._id]} />
      </div>
    ))}
  </div>
</div>

<div className="w-3/4 bg-white relative">
  {currentchat ? (
    <Chatbox
      chat={currentchat}
      currentUser={userId}
      setsendMessage={setsendMessage}
      receiveMessage={receiveMessage}
    />
  ) : (
    <div className="mt-10 text-center ">Select a conversation to start chatting.</div>
  )}
</div>

</div>
</>
 
  );
};

export default Chat;
