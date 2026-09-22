import { useState } from "react";
import  SelfLoveBombImage  from "./SelfLoveBombImage.jsx";
import SlbBank from "./SlbBank.jsx";


function SlbButton() {
  const [message, setMessage] = useState("");

  //gathering a random number to filter bank
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * SlbBank.length);
    const newMessage = SlbBank[randomIndex].message;
    setMessage(newMessage);
  };

  const handlePlay = () => {
    if (!message) return;
    
    // Stop any current speech before starting new
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
         {/* <h3>Click here for a love bomb</h3>  */}
        <button className = "bomb-button" onClick={handleClick}>
        </button>
      
      {/* Playback Button - only shows if there is a message */}
      <h1>{message}</h1>
      {message && (
        
        <button className= "button3" onClick={handlePlay}>
          ▶        </button>
      )}

      
    </>
  );
}

export default SlbButton;

