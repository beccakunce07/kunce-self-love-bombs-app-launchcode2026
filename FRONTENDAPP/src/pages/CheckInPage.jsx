import React, { useState } from 'react';
// import {EmotionsWheelImage} from '../components/EmotionsWheelImage.jsx'
import SpecificSlbButton from '../components/SpecificSlbButton';
import PageHeader from '../components/PageHeader';

function CheckInPage ({user}) { //attempting to pass the user as a prop in CheckInPage

  const userId = user ? user.userId || user.id : null;
  
  const [errors, setErrors] = useState({});
  const [categoryKey, setCategoryKey] = useState("");
  const [feeling, setFeeling] = useState("");
  const [checkInList, setCheckInList] = useState ([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editCheckInId, setEditCheckInId] = useState(null);

    const validate = () => {
    let newErrors = {};
    if (!feeling) newErrors.feeling = "oops. please select a feeling.";
    if (!categoryKey) newErrors.categoryKey = "oops. please select a category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  };

  const deleteCheckIn = async (idToDelete) => {
    try {
      const response = await fetch(`http://localhost:8080/check-in/delete/${idToDelete}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove item from state array visually once backend confirms success
        setCheckInList(checkInList.filter(item => item.checkInId !== idToDelete));
        console.log("Check-in entry removed from database successfully.");
      } else {
        console.error("Failed to delete entry from backend database.");
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    }
  };

    const startEdit = (item) => {
    setEditCheckInId(item.checkInId);
    setFeeling(item.feeling);
    setCategoryKey(item.categoryKey);
    setIsSubmitted(false);
  };


  const handleCheckInSubmit = async (e) => {
    e.preventDefault();

  if(validate()){
    const checkInData = {
      userId : userId,
      categoryKey : categoryKey,
      feeling : feeling,
      recordedAt : new Date().toISOString()
    };

     try {
      if (editCheckInId) {
        // if editCheckInId exists (user has clicked edit) run an HTTP PUT request to update the check in
        const response = await fetch(`http://localhost:8080/check-in/update/${editCheckInId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkInData)
        });

          if (response.ok) {
          const updatedCheckIn = await response.json();
          // Map across current list array and swap out only the updated element
          setCheckInList(checkInList.map(item => item.checkInId === editCheckInId ? updatedCheckIn : item));
          setEditCheckInId(null);
          setIsSubmitted(true);
          setFeeling(""); 
          setCategoryKey("");
          setErrors({});
        }
      }
      
      else {
        const response = await fetch (`http://localhost:8080/check-in/user/${userId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(checkInData)
            });

            if (response.ok) {
              const savedCheckIn = await response.json();
              setCheckInList([...checkInList, savedCheckIn]);
              console.log("Check-in added successfully. Thank you.", savedCheckIn);
              <p>"Check-in added successfully. Thank you."</p>
                          
            setIsSubmitted(true);
            setFeeling(""); //resetting form after successful save
            setCategoryKey("");
            setErrors({});
          }
        }
        

          //  {
          //   console.error("Dang! Server error - could not save your check-in.");
          //   setErrors({submit: "Dang! Server error - could not save your check-in."})
      
          //   }
          } catch (error) {
            console.error('Oh dear. There was an error saving your check-in', error)
          }
        }
    };
  

  return (
    <>
    <PageHeader title = "Let's Check In"/>
    <div className="page-wrapper">
      <form className='content-card' onSubmit = {handleCheckInSubmit}>
        {isSubmitted && (
          <h1>✨Thank you for checking in! Your entry has been logged!✨</h1>

          )}
      <h2> Today I am feeling...{feeling.toLowerCase()}</h2>

      {errors.submit && <p className="error">{errors.submit}</p>}
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

      <h3> About my...{categoryKey.toLowerCase()}</h3>
      
      <div className = "button-container">
      <button type = "button" className = "button2" onClick={() => setCategoryKey("finances")}>Finances</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("body")}>Body</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("relationship")}>Relationship</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("purpose")}>Purpose</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("career")}>Career</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("world")}>Worlde</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("life in general")}>Life in general</button>
      <button type = "button" className = "button2" onClick={() => setCategoryKey("something else")}>Something Else</button>
      </div>
          
      <SpecificSlbButton categoryKey = {categoryKey}/>
       {editCheckInId && (
            <button type="submit" className="button1">
              Update Check-In
            </button>
       )}
      </form>
      <div className = "content-card">
        <h1>{user?.firstName}'s Check-Ins</h1>
        {checkInList.length === 0 ? ( 
            <p>No logged entries found yet.</p>
          ) : (
            <ul>
              {checkInList.map((item) => (
                <li key={item.checkInId} className="content-card" >
                  <div>
                    <strong>Feeling</strong> {item.feeling} | <strong>Category:</strong> {item.categoryKey}
                  </div>
                  <div>
                    <button type="button" className="button" onClick={() => startEdit(item)} >Edit Check-In</button> 
                    <button type="button" className="button" onClick={() => deleteCheckIn(item.checkInId)}>Delete Check-In</button>
                  </div>
                  </li>
              ))}
                  </ul>
          )}
      </div>

      
      </div>
  
</>
  
  );
}



export default CheckInPage;