import React, { useState, useEffect } from 'react';

function CYOForm({ user }) {
  const userId = user ? user.userId || user.id : null;

  const [messageList, setMessageList] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    message: "",
    categoryKey: ""
  });

  // Automatically fetch existing love bombs from the repo when component loads
  useEffect(() => {
    // Only attempt to fetch data if the userId prop has resolved and is loaded
    if (!userId) return;

    const fetchUserLoveBombs = async () => {
      try {
        const response = await fetch("http://localhost:8080/love-bomb/find-all");
        if (response.ok) {
          const data = await response.json();
          
          const userSpecificBombs = data.filter(item => {
            
            const itemUserId = item.user ? (item.user.userId || item.user.id) : item.userId;
            return Number(itemUserId) === Number(userId);
          });
          setMessageList(userSpecificBombs);
        }
      } catch (error) {
        console.error("Error fetching baseline Love Bank entries:", error);
      }
    };
    
    fetchUserLoveBombs();
  }, [userId]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.message || !formData.message.trim()) newErrors.message = "Whoops. message is required.";
    if (!formData.categoryKey) newErrors.categoryKey = "uh oh. please add a category this relates to.";
    
    if (!userId) {
      console.error("Cannot submit form: userId is missing or undefined.");
      newErrors.submit = "You must be logged in to save a message.";
    }
        
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMessageSubmit = async (m) => {
    m.preventDefault();

    if (!validate()) return; 

    if (editMessageId) {
      try {
        // Updates the backend LoveBombRepository
        const response = await fetch(`http://localhost:8080/love-bomb/update/${editMessageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: formData.message,
            categoryKey: formData.categoryKey
          })
        });

        if (response.ok) {
          const updatedMessage = await response.json();
          // clears out form
          setMessageList(messageList.map(item => item.loveBombId === editMessageId ? updatedMessage : item));
          setEditMessageId(null);
          setFormData({ message: "", categoryKey: "" });
          setShowForm(false);
          setErrors({});
        }
      } catch (error) {
        console.error('Oh no. Error updating love Bomb.', error);
        setErrors({ submit: "Failed to update message. Please try again." });
      }
    } else {
      try {
        // saves new entry
        const response = await fetch(`http://localhost:8080/love-bomb/user/${userId}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            message: formData.message,
            categoryKey: formData.categoryKey
          })
        });

        if (response.ok){
          const savedMessage = await response.json();
          // edits new entry directly
          setMessageList([...messageList, savedMessage]);
          console.log("Love Bomb added successfully. Thank you.", savedMessage);
          setFormData({ message: "", categoryKey: "" });
          setShowForm(false);
          setErrors({});
        }
      } catch (error) {
        console.error('Oh no. Error adding love Bomb.', error);
        setErrors({ submit: "Failed to save message. Please try again." });
      }
    }
  };

  const deleteItem = async (loveBombId) => {
    try {
      // delete
      const response = await fetch(`http://localhost:8080/love-bomb/delete/${loveBombId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // filter
        setMessageList(messageList.filter(item => item.loveBombId !== loveBombId));
        console.log("Love bomb removed from database successfully.");
      } else {
        console.error("Failed to delete entry from backend database.");
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    }
  };

  const startEdit = (item) => {
    setEditMessageId(item.loveBombId);
    setFormData({
      message: item.message || "",
      categoryKey: item.categoryKey || ""
    });
    setShowForm(true); 
  };

  return (
    <div> 
      <button type="button" className='button1' onClick={() => {
        setShowForm(!showForm);
        if (showForm) { setEditMessageId(null); setFormData({message: "", categoryKey: ""}); }
      }}>
        {showForm ? "⟢Close Form⟢" : "⟢Let's Create⟢"}
      </button>
 
      {showForm && ( 
        <form className="CYOform" onSubmit={handleMessageSubmit}>
          {errors.submit && <p className="error">{errors.submit}</p>}
          <div className="form-group">
            <label htmlFor="message">Speak Kindly to Yourself Here Please:</label>
            <input 
              name="message"
              id="message"
              value={formData.message} 
              onChange={handleChange}
              placeholder="i.e. 'I am loved and adored always.'"
            />
            {errors.message && <p className="error">{errors.message}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="categoryKey">This relates to my:</label>
            <select 
              id="categoryKey"
              name="categoryKey"
              value={formData.categoryKey}
              onChange={handleChange}
            >
              <option value="">⟢Choose Category⟢</option>
              <option value="body">body</option>
              <option value="career">career</option>
              <option value="relationship">relationship</option>
              <option value="purpose">purpose</option>
              <option value="finances">finances</option>
              <option value="world">world</option>
              <option value="life in general">life in general</option>
              <option value="something else">something else</option>
            </select>
            {errors.categoryKey && <p className="error">{errors.categoryKey}</p>}
          </div>

      
          {editMessageId ? (
            <button className="button2" type="submit">Update Bank</button>
          ) : (
            <button className="button2" type="submit">Add to Bank</button>
          )}
        </form>
      )}
      
      <div className="bank-list-container">
        {messageList.length === 0 ? (
          <p>Your bank is empty. Start adding some affirmations above!</p>
        ) : (
          <ul className="bank-list">
            {messageList.map((item) => (
              <li key={item.loveBombId} className="content-card">
                <div>
                  <h3>{item.message} relating to {item.categoryKey}</h3>
                  <p>
                    This <em>Self Love Bomb </em> was logged on {' '}
                    {item.timeSubmitted ? new Date(item.timeSubmitted).toLocaleDateString(undefined, {
                      weekday: 'short', 
                      month: 'short',
                      day: 'numeric'
                    }) : 'At'} at {item.timeSubmitted ? new Date(item.timeSubmitted).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </p>
                </div>
                <div>
                  <button type="button" className="button3" onClick={() => startEdit(item)}>Edit Check-In</button> 
                  <button type="button" className="button3" onClick={() => deleteItem(item.loveBombId)}>Delete Check-In</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> 
  ); 
}

export default CYOForm;
