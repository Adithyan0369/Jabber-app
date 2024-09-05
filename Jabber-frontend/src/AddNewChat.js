import React, { useState } from 'react';
import Axios from 'axios';

function AddNewChat(props) {
    const { rooms, setRooms,setRoomFlag,roomFlag } = props.listRoom1;
    const [roomName, setRoomName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [creatorName, setCreatorName] = useState('');
    const [theme, setTheme] = useState('');
    const [CreatorEmail, setCreatorEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const createChat = (e) => {
        e.preventDefault();
        Axios.post('https://jabber-public-discussion-forum.onrender.com/api/v1/jabber/chat/', {
            roomName: roomName,
            creatorName: creatorName,
            creatorEmail: CreatorEmail,
            profileImage: imageUrl,
            theme: theme,
            timestamp: new Date().toLocaleTimeString()
        }).then((res) => {
            const newChatRoom = {
                _id: res.data.todoresponse.insertedId,
                roomName: roomName,
                creatorName: creatorName,
                creatorEmail: CreatorEmail,
                profileImage: imageUrl,
                theme: theme,
                timestamp: new Date().toLocaleTimeString()
            }
            setRooms([...rooms, newChatRoom]);
            setRoomFlag(!roomFlag);
            setShowPopup(true); // Show the popup on successful creation
        })
        .catch((error) => {
            console.log(error);
        });
        // Reset input fields
        setRoomName("");
        setImageUrl("");
        setCreatorName("");
        setTheme("");
        setCreatorEmail("");
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='bg-indigo-950 p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-8'>
            <h2 className='text-3xl text-pink-600 font-bold text-center mb-8'>ADD NEW CHAT</h2>
            <form className='grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={createChat}>
                <div>
                    <label className='block text-white mb-2'>Chat Name:</label>
                    <input type="text" className='w-full p-2 rounded border border-gray-300' value={roomName} required onChange={(e) => setRoomName(e.target.value)} />
                </div>
                <div>
                    <label className='block text-white mb-2'>Profile URL:</label>
                    <input type="text" className='w-full p-2 rounded border border-gray-300' value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div>
                    <label className='block text-white mb-2'>Creator Name:</label>
                    <input type="text" className='w-full p-2 rounded border border-gray-300' value={creatorName} required onChange={(e) => setCreatorName(e.target.value)} />
                </div>
                <div>
                    <label className='block text-white mb-2'>Creator Email:</label>
                    <input type="email" className='w-full p-2 rounded border border-gray-300' value={CreatorEmail} required onChange={(e) => setCreatorEmail(e.target.value)} />
                </div>
                <div className='md:col-span-2'>
                    <label className='block text-white mb-2'>Description:</label>
                    <textarea rows="4" className='w-full p-2 rounded border border-gray-300' value={theme} required onChange={(e) => setTheme(e.target.value)} />
                </div>
                <div className='md:col-span-2 text-center'>
                    <button className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700' type='submit'>Create Chat</button>
                </div>
            </form>

            {/* Popup Notification */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
                        <p className="text-xl mb-4">Chat Room Created Successfully!</p>
                        <div className='flex items-center justify-center'>
                        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 focus:outline-none" onClick={closePopup}>
                            Close
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNewChat;
