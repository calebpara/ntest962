import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';

const Macha = () => {

   const [showModal, setShowModal] = useState(false)
   const onClick = () => setShowModal(true)

   return (
      <>
      { showModal ?
      <div className={{backgroundColor: "red", padding: "8px", zIndex: "100", position: "absolute", height: "400px", width: "600px", top: 0, left: 0}}>
         <p className={{color: "red"}} >
         this is the modal
         </p>
      </div>
      :
      <div onClick={onClick} style={{height: "160px", cursor: "pointer", width: "220px", backgroundColor: "black", borderRadius: "16px", position: "absolute", bottom: 0, right: 0, margin: "16px", zIndex: "100"}}>
        <div style={{backgroundColor: "red", margin: "8px", position: "absolute", padding: "4px",  borderRadius: "8px"}}>
        <p style={{color: "white", fontSize: "15px"}}>
        Live
        </p>
        </div>
      </div>
      }
   </>
   )
}
export default Macha;


export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
   const [chatClient, setChatClient] = useState(null);
 
   useEffect(() => {
     const client = new StreamChat(apiKey);
     // prevents application from setting stale client (user changed, for example)
     let didUserConnectInterrupt = false;
 
     const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
       if (!didUserConnectInterrupt) setChatClient(client);
     });
 
     return () => {
       didUserConnectInterrupt = true;
       setChatClient(null);
       // wait for connection to finish before initiating closing sequence
       connectionPromise
         .then(() => client.disconnectUser())
         .then(() => {
           console.log('connection closed');
         });
     };
   }, [apiKey, userData.id, tokenOrProvider]);
 
   return chatClient;
 };