
import './App.css';
import { useState } from 'react';
import {BrowserRouter as Router,Switch ,Route, Routes} from 'react-router-dom';
import TaskBar from './TaskBar';
import User from './User';
import Forum from './Forum';
import New from './New'
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
// import Delete from './delete';
import ContactForm from './help';
// import Edit from './Edit';
function App() {
  const [{user},dispatch] = useStateValue();
  const [rooms,setRooms] = useState([]);
  const [roomFlag,setRoomFlag] = useState(false);
  return (
    <div className="App">
     {!user ?<Login/> :(
    <div className='app_body'>
        <Router>
        <TaskBar/>
        <User listRoom={{ rooms, setRooms ,setRoomFlag,roomFlag}}/>
          <Routes>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/rooms/:id" element={<Forum listRoom={{ rooms, setRooms ,setRoomFlag,roomFlag}}/>}> </Route>
            <Route path="/addChat" element={<New listRoom={{ rooms, setRooms,setRoomFlag,roomFlag }}/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/contact" element={<ContactForm/>}></Route>
          </Routes>
        </Router>
    </div>
    )} 
    </div>
  );
}

export default App;
