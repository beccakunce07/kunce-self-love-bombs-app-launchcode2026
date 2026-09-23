import React, { useState } from 'react';

function CreateUserForm() {

    //Setting the form data to empty string s
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    birthday: ""
  });
  //creating our useState variables
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //these prevent emptyt submissions from being entered.

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Whoops. First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Whoopsie Poopsie. Last name is required.";
    if (!formData.username.trim()) newErrors.username = "Oopsie Daises. Username is required.";
    if (!formData.email.trim()) newErrors.email = "Oh dear. Email is required,:"
    if (!formData.birthday.trim()) newErrors.birthday = "Oahr naorhhh. Birthday is required. "
    
    // Validation -- checks if the email entered does not include '@'
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address containing '@'.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Will return true if no errors
    };

    const handleSubmit = (m) => {
        m.preventDefault();

        //so if the data entered passes the validation checks...
    if (validate()) {
      if (editUserId) {
        // Edit user
        setUser(user.map(item => item.userId === editUserId ? { ...item, ...formData } : item));
        setEditUserId(null);
      } else {
        // Add new user
        const addUser = async() => { //a cute lil anon function to get us through the fetching phase
          try{
            const response = await fetch ('http://localhost:8080/user/create-form', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(formData)
            })

            if (response.ok){
            const savedUser = await response.json();
            setUser([...user, savedUser]);
            console.log("User added successfully. Thank you.", savedUser);
              //resetting the form back to empty strings after submission
            
            setErrors({});
            }} catch (error) {
              console.error('Oh no. Error adding user:', error)
            }
          }

          addUser();
        } 
        
      }
   
    }
    
    //delete user 
    const deleteItem = (targetUserId) => {
        setUser(user.filter(item => item.userId !== targetUserId));
    };

    const startEdit = (item) => {
      setEditUserId(item.userId);
    // pre fill out form with the selected user's data on edit so they dont have to do extra work
    setFormData({
      firstName: item.firstName,
      lastName: item.lastName,
      username: item.username,
      email: item.email,
      birthday: item.birthday
    });
    setShowForm(true);
  };

  return (
    <div> {/* button to show or close form. using logic */}
      <button className='button1' onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "⟢Let's Get to Know You⟢"}
      </button>
 
      {showForm && ( 
        <form className="form" onSubmit={handleSubmit}>
          <div className = "form-group">
            <label htmlFor="firstName">First Name:</label>
          <input
            name = "firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
          />
          {errors.firstName && <p style={{ color: "red"}}>{errors.firstName}</p>}
          
          <label htmlFor="lastName">Last Name:</label>
          <input 
            name = "lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
          />
          {errors.lastName && <p style={{ color: "red"}}>{errors.lastName}</p>}
          
          <label htmlFor="username">Username:</label>
          <input 
            name = "username" 
            value={formData.username} 
            onChange={handleChange}  
          />
          {errors.username && <p style={{ color: "red"}}>{errors.username}</p>}
                
          <label htmlFor="email">Email:</label>
          <input 
            name = "email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <p style={{ color: "red"}}>{errors.email}</p>}

          <label htmlFor="birthday">Birthday:</label>
          <input 
            name = "birthday" 
            placeholder="YYYY-MM-DD"
            value={formData.birthday} 
            onChange={handleChange} 
          />
          {errors.email && <p style={{ color: "red"}}>{errors.birthday}</p>}
          </div>
          
          <input type="hidden" id="submittedAt" name="submittedAt"></input>

          <button className="button1" type="submit">
            {editUserId ? "Update User" : "Add User"}
          </button>
        </form>
        
      )}
      
      <div>
        {user.map((item) => (
          <ul key={item.userId}>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
            <p>{item.username}</p>
            <p>{item.email}</p>
            <p>{item.birthday}</p>
            <button className="button1" onClick={() => 
              startEdit(item)}
              >Edit</button>
            <button className="button1" onClick={() => deleteItem(item.userId)}>Delete</button>
          </ul>
        ))}
      </div>
      
    </div> 

    
  ); 

}
  
    
export default CreateUserForm;
