import React, { useEffect, useState } from "react";
import { Chat,Channel,} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/index.css";
import Auth from "./components/Auth"
import MessagingContainer from "./components/MessagingContainer";
import Video from "./components/Video";
import { useCookies } from 'react-cookie'




const client = StreamChat.getInstance('5fvpwurat73w')

const App = () => {

  const [cookies, setCookie , removeCookie] =  useCookies(['user'])
  
  const [channel, setchannel] = useState(null)
  const authtoken = cookies.AuthToken
 

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedpassword: cookies.HashedPassword
          
        },
        authtoken
      )
      

      const channel = await client.channel('gaming', 'demo', {
        name: 'Gaming Demo',
      })
      setchannel(channel)
      

      
    } catch (error) {
      console.log(error);
    }
  }
  
 if(authtoken) {
   setupClient()}
  
  
  return (
    <>
    {!authtoken && <Auth/>}
    {authtoken && <Chat client={client} darkMode={true}>
      
      <Channel channel={channel}>
      <Video/>
      <MessagingContainer/>
        
      </Channel>
    </Chat>}
    </>
  );
};

export default App;



