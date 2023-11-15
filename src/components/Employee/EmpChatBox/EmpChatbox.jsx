import React, { useEffect, useRef, useState } from "react";
import { getuserData } from "../../../api/chatRequest";
import { Avatar } from "flowbite-react";
import { useFetcher } from "react-router-dom";
import { addMessage, getMessages } from "../../../api/messageRequest";
import {format} from 'timeago.js'
const EmpChatBox = ({ chat, currentUser, setsendMessage, receiveMessage }) => {
  const [userData, setuserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    console.log(userId, ">>>>>>");
    const getUser = async () => {
      try {
        const { data } = await getuserData(userId);
        setuserData(data);
        console.log(data, ">>>>>>>..");
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getUser();
  }, [chat, currentUser]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, { ...receiveMessage, isRead: false }]);
    }
  }, [receiveMessage,chat._id]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await getMessages(chat?._id);
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) fetchMessage();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setnewMessage("");
    } catch (error) {
      console.log(error.message);
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setsendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-interface">
        {chat ? (
          <>
            <h1 className="text-center text-2xl font-bold py-4">
              Chat Interface
            </h1>
            <div className="h-16 shadow-lg">
              <Avatar className="h-16" img={userData?.profileimage} rounded-md>
                <div className="space-y-1 font-medium dark:text-white">
                  <div className="">{userData?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400"></div>
                </div>
              </Avatar>
            </div>
            <div className="messages-box h-96 p-4 overflow-y-auto mb-4 ">
            {messages.map((m) => (
  <div
    ref={scroll}
    className={
      m.senderId === currentUser
        ? "chat chat-end"
        : "chat chat-start"
    }
  >
    <div className={`chat-bubble ${m.isRead ? 'read' : 'unread'}`}>
      {m.text}
    </div>
    <time className="text-xs opacity-50">
      {format(m.createdAt)}
    </time>
  </div>
))}
            </div>
            <div className="input-box absolute bottom-0 left-0 w-full flex p-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-lg border"
                value={newMessage}
                onChange={(e) => setnewMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <h1>sjsgjsgsgg</h1>
        )}
      </div>
    </>
  );
};

export default EmpChatBox;
