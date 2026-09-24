import React, { useState } from 'react';


const ContactUsForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); 
  const [showForm, setShowForm] = useState(false);

  //const to handle the change on the form - to set the name and value 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for Contacting Us!');
    setShowForm(false); ///hiding after submission
  };

//using onClick to set the form show to true. && operator to only show form when showForm is true
  return (
    <>
      <button className = 'button1' onClick={() => setShowForm(true)}> 
        ⟢ Contact Us ⟢
      </button>

      {showForm && (
        <div className="contact-container">
          <div className="contact-card">
            <h2>Contact Us</h2>
            <p>We'd love to hear how we can improve. Please leave us a message below.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="i.e Arya Stark" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="StarkArya88@example.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" placeholder="How can we help?" value={formData.message} onChange={handleChange} required ></textarea>
              </div>
              <button type="submit" className="submit-btn"> Send </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUsForm;
