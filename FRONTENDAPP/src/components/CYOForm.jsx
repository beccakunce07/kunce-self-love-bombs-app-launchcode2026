import React, { useState } from 'react';

function CYOForm({user}) {

  const userId = user ? user.userId || user.id : null;

  const [messageList, setMessageList] = useState([]);
  const [editMessageId, setEditMessageId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    message: "",
    categoryKey: ""
  }
  )

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.message || !formData.message.trim()) newErrors.message = "Whoops. message is required.";
    if (!formData.categoryKey) newErrors.categoryKey = "uh oh. please add a category this relates to."
    

    if (!userId) {
      console.error("Cannot submit form: userId is missing or undefined.");
      newErrors.submit = "You must be logged in to save a message.";

        }
        
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

  const handleMessageSubmit = (m) => {
    m.preventDefault();


    if (!validate()) return; //if fails validation check just ends instead of going through everything else

      if (editMessageId) {
        setMessageList(messageList.map(item => item.messageId === editMessageId ? {...item, ...formData, timeSubmitted: new Date().toISOString } : item));
        setEditMessageId(null);
        setFormData({message: "", categoryKey: ""});
        setShowForm(false);
    } else {
      const addLoveBomb = async () => {
        try {
          const response = await fetch(`http://localhost:8080/love-bomb/user/${userId}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            message: formData.message,
            categoryKey: formData.categoryKey,
            timeSubmitted: new Date().toISOString()
          })
        });

        if (response.ok){
          const savedMessage = await response.json();
          setMessageList([...messageList, savedMessage]);
          console.log("Love Bomb added successfully. Thank you.", savedMessage);
          return <p>Your love bomb was added succesfully. Thank you</p>        
        }

        setFormData({ message: "", categoryKey: "" });
        setShowForm(false);
        setErrors({});
        } catch (error) {
          console.error('Oh no. Error adding love Bomb.', error)
          setErrors({ submit: "Failed to save message. Please try again." });
          return <p>Failed to save message. Please try again.</p>
        }
  }
    addLoveBomb();
  }
};
  const deleteItem = (messageId) => {
    setMessageList(messageList.filter(item => item.messageId !== messageId));
  };

const startEdit = (item) => {
    setEditMessageId(item.messageId);
    setFormData({
      message: item.message || item.text || "",
      categoryKey: item.categoryKey || ""
    });
    setShowForm(true); 
  };

  return (
    <div> {/* button to show or close form. using logic */}
      <button type = "button" className='button1' onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "⟢Let's Create⟢"}
      </button>
 
      {showForm && ( 
        <form className="CYOform" onSubmit={handleMessageSubmit}>
          <p>{errors.submit}</p>
          <div className = "form-group">
            <label htmlFor="message">Speak Kindly to Yourself Here Please:</label>
          <input 
              name="message"
              id="message"
              value={formData.message} 
              onChange={handleChange}
              placeholder="i.e. 'I am loved and adored always.'"
            />
            <p>{errors.message}</p>
          </div>
          
          <div className = "form-group">
          <label htmlFor="categoryKey">This relates to my:</label>
          <select 
          id="categoryKey"
          name="categoryKey"
          value = {formData.categoryKey}
          onChange={handleChange}>
          
            <option value = "">⟢Choose Category⟢</option>
            <option value="Finances">finances</option>
            <option value="Body">body</option>
            <option value="Relationship">relationship</option>
            <option value="Purpose">purpose</option>
            <option value="Life In General">life in general</option>
            <option value="Something Else">something else</option>
          </select>
          <p>{errors.categoryKey}</p>
          </div>
          <input type="hidden" id="timeSubmitted" name="timeSubmitted"></input>

          <button className="button2" type="submit">
            {editMessageId ? "Update Bank" : "Add to Bank"}
          </button>
        </form>
        
      )}
      
      <ul>
        {messageList.map((item, index) => {
          const itemKey = item.messageId || item.id ||index;
          return (
          <li key={itemKey}>
            <p>{item.text}</p>
            <p><em>[{item.categoryKey}]</em>: {item.message}</p>
            <button className="button1" onClick={() => startEdit(item)}>Edit</button>
            <button className="button3" onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
          );
        }
      )}
      </ul>
      
    </div> 

    
  ); 
};

export default CYOForm;
