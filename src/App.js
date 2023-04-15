import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import UpdatePost from "./components/UpdatePost";

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/create' element={<CreatePost/>} ></Route>
        <Route path='/update/:id' element={<UpdatePost/>} ></Route>
        

        
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}


export default App;
