// import { createContext, useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";


// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {


//   // Move the useSelector call inside the component function
//   const { userInfo } = useSelector((state) => state.user);

//  console.log(userInfo.token,"_____________-")

//   // Use the userInfo from useSelector to setuser
//   const [user, setuser] = useState(userInfo);
//   const [selectedChat, setselectedChat] = useState()
//   const [chat, setchat] = useState([])

//   return <ChatContext.Provider value={{ user, setuser,selectedChat, setselectedChat,chat, setchat }}>{children}</ChatContext.Provider>;
// };

// export const ChatState = () => {
//   return useContext(ChatContext);
// };

// export default ChatProvider;
