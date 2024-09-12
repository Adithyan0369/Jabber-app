import React from 'react';
import Picker from 'emoji-picker-react';
import './emoji.css'
function Emoji({setPopUp2,input,setInput}) {

    
    const onEmojiClick = (event, emojiObject) => {
        console.log(event);
        setInput(prevInput => prevInput + event.emoji);
      };

    return (
        <div className='emo'>
        <div>
        <div className='emoji'>
        <div className='emoj'>
            <Picker class="dark" id="pick" pickerStyle={{ width: '580px' }} onEmojiClick={onEmojiClick} />
        </div>
        </div>

        </div>

        </div>
      
    );
}

export default Emoji
