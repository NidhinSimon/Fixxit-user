import React, { useEffect, useState } from "react";
import { getuserData } from "../../../api/chatRequest";

import { Avatar } from "flowbite-react";
const Conversations = ({  data, currentUser, receiveMessage, unread, onEnterChat }) => {
  const [userData, setuserData] = useState(null);

  const [unreadCount, setUnreadCount] = useState(0);
  const [isInChat, setIsInChat] = useState(false);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getuser = async () => {
      try {
        const { data } = await getuserData(userId);
        setuserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (data !== null) {
      getuser();
      setUnreadCount(0); 
    }

    return () => {

      setIsInChat(false);
    };

  }, [data, currentUser]);


  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === data._id) {
      if (unread && !isInChat) {
        setUnreadCount((prevCount) => prevCount + 1);
        console.log("Mark as read");
      }
    }
  }, [receiveMessage, data._id, unread, isInChat]);

  const handleChatClick = () => {
    setIsInChat(true);
    onEnterChat(data._id);
  };



  return (
    <div>
        <div className={`bg-slate-300 rounded-md hover:bg-slate-500 ${unread && !isInChat ? "bg-green-500  rounded-lg" : ""}`} onClick={handleChatClick}>
        <Avatar className="h-16" img={userData?.profileimage} rounded-md>
          {unreadCount > 0 && !isInChat && (
            <div className="notification-icon bg-green-400 w-5 h-5 rounded-full relative left-20">
            <p className="relative left-1.5 bottom-1   text-white">
            {unreadCount}
            </p>
          
            
            </div>
          )}
          <div className="space-y-1 font-medium dark:text-white">
            <div className="">{userData?.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400"></div>
          </div>
        </Avatar>
      </div>
    </div>
  );
};

export default Conversations;
