
import './App.css';
import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard  from './dashboard/Dashboard';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className='app' >
        <BrowserRouter>
        <Routes>
       <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        </Routes>
        </BrowserRouter>
        </div>
  );
}

export default App;
