import React, { useState } from 'react';
// import {EmotionsWheelImage} from '../components/EmotionsWheelImage.jsx'
import SpecificSlbButton from '../components/SpecificSlbButton';
import PageHeader from '../components/PageHeader';

function CheckInPage () {
  
  const [errors, setErrors] = useState({});
  const [categoryKey, setCategoryKey] = useState("");
  const [feeling, setFeeling] = useState("");
  const [checkInList, setCheckInList] = useState ([]);

  const validate = () => {
    let newErrors = {};
    if (!feeling && !categoryKey) newErrors = "oops. please check-in with both a feeling and a category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  };

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();

  if(validate()){
    const checkInData = {
      categoryKey : categoryKey,
      feeling : feeling,
      recordedAt : new Date().toISOString()
    };

      try {
        const response = await fetch ('http://localhost:8080/check-in/create-check-in', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(checkInData)
            });

            if (response.ok) {
              const savedCheckIn = await response.json();
              setCheckInList([...checkInList, savedCheckIn]);
              console.log("Check-in added successfully. Thank you.", savedCheckIn);
            }

         

            setErrors({});
          } catch (error){
            console.error('Oh dear. There was an error saving your check-in', error)
          }
    }
  }


  return (
    <>
    <PageHeader title = "Let's Check In"/>
    {/* <div className="page-wrapper"> */}
      <form className='content-card' onSubmit = {handleCheckInSubmit}>
      <h2> Today I am feeling...</h2>

      {errors.feeling && <p className="error">{errors.feeling}</p>}
      {errors.categoryKey && <p className="error">{errors.categoryKey}</p>}

      <div className = "button-container">
      <button type = "button" className = "button1" onClick={() => setFeeling("sad")}>Sad</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("angry")}>Angry</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("depressed")}>Depressed</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("overwhelmed")}>Overwhelmed</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("happy")}>Happy</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("excited")}>Excited</button>
      <button type = "button" className = "button1" onClick={() => setFeeling("neutral")}>Neutral</button>
      </div>
      <p>Today I am feeling {feeling.toLocaleLowerCase()}</p>

      <h3> About my...</h3>
      
      <div className = "button-container">
      <button type = "button" className = "button2" onClick={() => setCategoryKey("finances")}>Finances</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("body")}>Body</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("relationship")}>Relationship</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("purpose")}>Purpose</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("life in general")}>Life in general</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("something else")}>Something Else</button>
      </div>
      
      <p>About my {categoryKey}.</p>   
      
      <SpecificSlbButton category = {categoryKey}/>
      <button type = "submit" className = "button">Log Check-In</button>

    
      </form>
      {/* </div> */}
  
</>
  
  )
}


export default CheckInPage;