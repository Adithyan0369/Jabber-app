import React from 'react';
import Picker from 'emoji-picker-react';
import './emoji2.css'
function Emoji({setPopUp2,input,setInput}) {

    
    const onEmojiClick = (event, emojiObject) => {
        console.log(event.emoji);
        setInput(prevInput => prevInput + event.emoji);
      };

    return (
        <div className='emojj'>
            <Picker class="dark" id="pick" height={314}  pickerStyle={{ width: '580px' }} onEmojiClick={onEmojiClick} />
        </div>
    );
}

export default Emoji
