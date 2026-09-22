import React, { useState } from 'react';
// import {EmotionsWheelImage} from '../components/EmotionsWheelImage.jsx'
import SpecificSlbButton from '../components/SpecificSlbButton';
import PageHeader from '../components/PageHeader';

function CheckInPage () {
  
  const [key, setKey] = useState("");
  const [feeling, setFeeling] = useState("");

  return (
    <>
    <PageHeader title = "Let's Check In"/>
    <div className="page-wrapper">
      <div className='content-card'>
      <h2> Today I am feeling...</h2>
      <div className = "button-container">
      <button className = "button1" onClick={() => setFeeling("sad")}>Sad</button>
      <button className = "button1" onClick={() => setFeeling("angry")}>Angry</button>
      <button className = "button1" onClick={() => setFeeling("depressed")}>Depressed</button>
      <button className = "button1" onClick={() => setFeeling("overwhelmed")}>Overwhelmed</button>
      <button className = "button1" onClick={() => setFeeling("happy")}>Happy</button>
      <button className = "button1" onClick={() => setFeeling("excited")}>Excited</button>
      <button className = "button1" onClick={() => setFeeling("neutral")}>Neutral</button>
      </div>
      <p>Today I am feeling {feeling.toLocaleLowerCase()}</p>

      <h3> About my...</h3>
      
      <div className = "button-container">
      <button className = "button2" onClick={() => setKey("finances")}>Finances</button>
      <button className = "button2" onClick={() => setKey("body")}>Body</button>
      <button className = "button2" onClick={() => setKey("relationship")}>Relationship</button>
      <button className = "button2" onClick={() => setKey("purpose")}>Purpose</button>
      <button className = "button2" onClick={() => setKey("life in general")}>Life in general</button>
      <button className = "button2" onClick={() => setKey("something else")}>Something Else</button>
      </div>
      
      <p>About my {key}.</p>   
      
      <SpecificSlbButton category = {key}/>
    </div>
    </div>
</>
  
  )
}


export default CheckInPage;