import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import axios from "axios";
import { useSelector } from "react-redux";
import { userChats } from "../../../api/chatRequest";
import EmpConversation from "../EmpConversation/EmpConversation";
import EmpChatBox from "../EmpChatBox/EmpChatbox";
import UserNav from "../../../Pages/UserNav";
import Navbar from "../Navbar";


const Chat = () => {



  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;


  console.log(providerId, ">>");
  const [chats, setchats] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [online, setOnline] = useState(null);
  const [sendMessage, setsendMessage] = useState(null);
  const [receiveMessage, setreceiveMessage] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState({});
  const socket = useRef();

  console.log(chats, ">>");
  useEffect(() => {
    const getchats = async () => {
      const { data } = await userChats(providerId);
      setchats(data);
    };
    getchats();
  }, [providerId]);

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", providerId);
    socket.current.on("get-users", (users) => {
      console.log(users, ">>>>>>>>>>>>");
      setOnline(users);
    });
  }, [providerId]);

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

<Navbar/>
<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 flex h-screen">

<div className="w-1/4 bg-yellow-100 border-r p-4">
  <div className="friends-list">
    <h1 className="font-semibold">Your Conversations</h1>
    {chats.map((chat) => (
      <div key={chat._id} className="mt-10" onClick={() => handleui(chat)}>
        <EmpConversation data={chat} currentUser={providerId} receiveMessage={receiveMessage}   unread={unreadMessages[chat._id]} />
      </div>
    ))}
  </div>
</div>

<div className="w-3/4 bg-white relative">
  {currentchat ? (
    <EmpChatBox
      chat={currentchat}
      currentUser={providerId}
      setsendMessage={setsendMessage}
      receiveMessage={receiveMessage}
    />
  ) : (
    <div className="mt-10 text-center">Select a conversation to start chatting.</div>
  )}
</div>

</div>

    </>
  );
};

export default Chat;
