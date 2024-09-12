import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Edit1({ currentMessage, currentImgUrl,setCurrentMessage,setCurrentImgUrl, onSave, onClose }) {
  const [newMessage, setNewMessage] = useState(currentMessage);
  const [newImgUrl, setNewImgUrl] = useState(currentImgUrl);

  const handleSave = () => {
    setCurrentMessage(newMessage);
    console.log("vggvd:",newMessage);
    setCurrentImgUrl(newImgUrl);
    console.log("vg:",newImgUrl);
    console.log("vl:",currentImgUrl);
    onSave(newMessage,newImgUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Message</h2>
          <CloseIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            className="w-full p-2 border rounded-lg"
            type="text"
            value={newImgUrl}
            onChange={(e) => setNewImgUrl(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Edit1;
