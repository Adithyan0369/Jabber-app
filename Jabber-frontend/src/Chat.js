import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '@material-ui/core';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { useParams} from 'react-router-dom';
import ImgPopUp from './imgPopUp';
import Emoji from './emoji';
import Axios from 'axios';
import { useStateValue } from './StateProvider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Edit1 from './Edit1';
import io from "socket.io-client";


const APILINK = "https://jabber-public-discussion-forum.onrender.com/api/v1/jabber/chat/";
const socket = io.connect("https://jabber-public-discussion-forum.onrender.com");
function Chat() {
  const [roomInfo, setRoomInfo] = useState([]);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [inputURL, setInputURL] = useState('');
  // const [inputE, setInputE] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showEditedPopup, setShowEditedPopup] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [flag,setFlag]= useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
const [currentImgUrl, setCurrentImgUrl] = useState('');
const [currentSelectedMsg,setCurrentSelectedMsg] = useState('');
  useEffect(()=>{
    if(id)
    {
      socket.emit("join_room", id);
    }
  },[id])
  useEffect(() => {
    if (id) {
      Axios.get(APILINK + id).then(res => {
        setRoomInfo(res.data);
      }).catch(err => {
        console.log(err);
        console.log("error");
      });

      Axios.get(APILINK + id + "/messages").then(res => {
        setMessages(res.data);
      }).catch(err => {
        console.log(err);
        console.log("error");
      });
      socket.off('receive_message').on('receive_message', (data) => {
        setMessages((list) => [...list, data]);
      });
      socket.off('delete_message').on('delete_message', (data) => {
        setMessages((list) => list.filter(msg => msg._id !== data.messageId));
      });
    }
    return () => {
      socket.off('receive_message');
    };
  }, [id,flag]);

  const messageEl = useRef(null);

  useEffect(() => {
    messageEl.current?.scrollIntoView();
  }, [messages]);

  const sendMessages = async (e) => {
    e.preventDefault();
    if(input !== "")
    {
      await Axios.post(APILINK + id + "/messages", {
        message: input,
        imgUrl: inputURL,
        userName: user.displayName,
        id: id,
        timestamp: new Date().toLocaleString()
      }).then((res) => {
        const newChatMsg = {
          id: res.data.msgpostResponse.insertedId,
          message: input,
          imgUrl: inputURL,
          userName: user.displayName,
          id: id,
          timestamp: new Date().toLocaleString()
        };
        setMessages([...messages, newChatMsg]);
        setFlag(!flag);
        socket.emit("send_message", newChatMsg);
      }).catch(function (error) {
        console.log(error);
      });
      setInput("");
      setInputURL("");
    }
    
  };

  const deleteMessage = (messageId) => {
    Axios.delete(`${APILINK}${id}/messages/${messageId}`,).then((res) => {
      setMessages(messages.filter(message => message._id !== messageId));
      console.log(res.data);
      setShowDeletePopup(true);
      setFlag(!flag);
      setTimeout(() => setShowDeletePopup(false), 3000);
      socket.emit('delete_message', { messageId, id });

    }).catch((err) => {
      console.log(err);
    });
  };
  const edit = (msgId,message,imageUrl)=>{
    setShowEditPopup(true);
    console.log(msgId);
    setCurrentMessage(message);
    setCurrentImgUrl(imageUrl);
    setCurrentSelectedMsg(msgId);
  }
  const editMessage = (newMessage,newImgUrl) => {
    console.log("siiii:",newMessage);
    console.log("liiii:",newImgUrl);
    console.log("Hiiii",currentSelectedMsg);
    Axios.put(`${APILINK}${id}/messages/${currentSelectedMsg}`,{
      message: newMessage,
      imgUrl: newImgUrl,
      userName: user.displayName,
      id: id,
      timestamp: new Date().toLocaleString()
    }).then((res) => {
      console.log(res.data);
      setShowEditedPopup(true);
      setFlag(!flag);
      setTimeout(() => setShowEditedPopup(false), 3000);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="bg-indigo-950 p-4 md:p-2 rounded-lg shadow-lg flex h-full flex-col sm:h-full  w-[75%] md:h-full md:w-3/4 lg:h-[95vh] lg:w-3/4 border-2 border-gray-800">
      {roomInfo.map(room => (
        <div className="flex items-center p-4 bg-indigo-900 rounded-lg mb-2" key={room.id}>
          <Avatar src={room.profileImage} />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white">{room.roomName}</h3>
            <p className="text-gray-400 text-xs">
              last seen{" "}
              {messages[messages.length - 1]?.timestamp}
            </p>
          </div>
        </div>
      ))}
      <div className="flex-1 overflow-y-scroll p-2 bg-indigo-850 rounded-lg mb-4 scrollbar-hide">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.userName === user.displayName ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block rounded-lg ${message.userName === user.displayName ? 'bg-fuchsia-950 text-white' : 'bg-indigo-900 text-white'}`}>
              <div className={`flex items-center justify-between rounded-t-lg ${message.userName === user.displayName ? 'bg-fuchsia-900 text-white' : 'bg-indigo-800 text-white'} pb-2 pt-1 pr-3 pl-3 `}>
              <span className="block text-sm font-bold text-left">{message.userName}</span>
              {message.userName === user.displayName && (
                <div className="flex justify-end space-x-2 ml-3">
                  <div onClick={()=>edit(message._id,message.message,message.imgUrl)}>
                    <EditIcon className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  <div onClick={() => deleteMessage(message._id)}>
                    <DeleteOutlineOutlinedIcon className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              )}
              </div>
              <p className='mt-2 pr-3 pl-3'>{message.message}</p>
              {message.imgUrl && <img className="mt-2 rounded-lg h-48 pl-3 pr-3" src={message.imgUrl} alt="" />}
              <span className="block mt-2 text-xs text-gray-400 pb-3 pr-3 pl-3">{message.timestamp}</span>
              
            </div>
          </div>
        ))}
        <div ref={messageEl} />
      </div>
      <div className="flex items-center space-x-4 bg-indigo-900 p-4 rounded-lg">
        <InsertEmoticonIcon className="text-gray-400 cursor-pointer" onClick={() => setPopUp2(!popUp2)} />
        <form className="flex flex-1" onSubmit={sendMessages}>
          <input className="flex-1 p-2 rounded-l-lg border-none outline-none bg-white text-black" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
          <button type="submit" className="p-2 bg-pink-600 text-white rounded">Send</button>
        </form>
        <PhotoSizeSelectActualOutlinedIcon className="text-gray-400 cursor-pointer" onClick={() => setPopUp(!popUp)} />
      </div>
      {popUp2 && <Emoji setPopUp2={setPopUp2} input={input} setInput={setInput} />}
      {popUp && <ImgPopUp setPopUp={setPopUp} inputU={inputURL} setInputU={setInputURL} />}
      {showDeletePopup && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
          Message Deleted
        </div>
      )}
      {showEditPopup && (
      <Edit1
        currentMessage={currentMessage}
        currentImgUrl={currentImgUrl}
        setCurrentMessage={setCurrentMessage}
        setCurrentImgUrl={setCurrentImgUrl}
        onSave={editMessage}
        onClose={() => setShowEditPopup(false)}
      />
    )}
          {showEditedPopup && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          Message Edited
        </div>
      )}
    </div>
  );
}

export default Chat;
