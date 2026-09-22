import React, { useState } from 'react';

function CYOForm() {
  const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  
  const handleSubmit = (m) => {
    m.preventDefault();
    if (!input.trim()) return; //prevents empty submits being added to the bank

    if (editId) {
      setMessageList(messageList.map(item => item.id === editId ? { ...item, text: input } : item));
      setEditId(null);
    } else {
      setMessageList([...messageList, { id: Date.now(), text: input }]);
    }
    setInput("");
  };

  const deleteItem = (id) => {
    setMessageList(messageList.filter(item => item.id !== id));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setInput(item.text);
    setShowForm(true); // Ensure form is visible when editing
  };

  return (
    <div> {/* button to show or close form. using logic */}
      <button className='button1' onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "⟢Let's Create⟢"}
      </button>
 
      {showForm && ( 
        <form className="CYOform" onSubmit={handleSubmit}>
          <div className = "form-group">
            <label htmlFor="message">Speak Kindly to Yourself Here Please:</label>
          <input 
            value={input} 
            onChange={(m) => setInput(m.target.value)} 
            placeholder="i.e. 'I am loved and adored always.'"
          />
          </div>
          
          <div className = "form-group">
          <label htmlFor="key">This relates to my:</label>
          <select id="key">
            <option value="Finances">finances</option>
            <option value="Body">body</option>
            <option value="Relationship">relationship</option>
            <option value="Purpose">purpose</option>
            <option value="Life In General">life in general</option>
            <option value="Something Else">something else</option>
          </select>
          </div>
          <input type="hidden" id="submissionTime" name="submissionTime"></input>

          <button className="button1" type="submit">
            {editId ? "Update Bank" : "Add to Bank"}
          </button>
        </form>
        
      )}
      
      <ul>
        {messageList.map((item) => (
          <ul key={item.id}>
            <p>{item.text}</p>
            <button className="button1" onClick={() => startEdit(item)}>Edit</button>
            <button className="button3" onClick={() => deleteItem(item.id)}>Delete</button>
          </ul>
        ))}
      </ul>
      
    </div> 

    
  ); 
}

export default CYOForm;
