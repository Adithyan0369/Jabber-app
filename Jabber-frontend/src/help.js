import React, { useState } from 'react';
import Axios from 'axios';


const ContactForm = () => {
  const [formStatus, setFormStatus] = useState('Send');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const APILINK = "https://jabber-public-discussion-forum.onrender.com/api/v1/jabber/contact";

  const sendQuery = async (e) => {
    e.preventDefault();
    if (message !== "") {
      try {
        const response = await Axios.post(APILINK, {
          name: name,
          email: email,
          message: message
        });
        console.log("Query Sent Successfully");
        setShowPopup(true);
        setName("");
        setEmail("");
        setMessage("");
        setFormStatus('Send'); 
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-full py-8 w-full border-2 border-gray-800">
      <h2 className="text-3xl font-bold mb-6">CONTACT US</h2>
      <form className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md" onSubmit={sendQuery}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-purple-500"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-purple-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-purple-500"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="text-center">
          <button
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-700"
            type="submit"
          >
            {formStatus}
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-white text-lg mb-4">Query Sent Successfully!</p>
            <div className='flex items-center justify-center'>
            <button
              className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 focus:outline-none focus:bg-purple-700"
              onClick={closePopup}
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
