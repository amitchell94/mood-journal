import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import NavBar from './components/NavBar';
import { auth, db } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import MyLog from './components/MyLog';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NewEntry from './components/NewEntry';
import ViewEntry from './components/ViewEntry';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  return (
    <div className="App bg-light">
      <NavBar user={user}/>
      {isLoading? 
      (
      <div className='mt-5'>
         <Spinner animation="border" role="status" variant="secondary">
         <span className="visually-hidden">Loading...</span>
       </Spinner>
       </div>
       ) 
       :
        !user ? (<Welcome />) : 
        (
        <>
          <Routes>
            <Route path='/' element={<MyLog />} />
            <Route path='/new' element={<NewEntry />} />
            <Route path='/entry/:id' element={<ViewEntry />} />
          </Routes>
        </>
        ) }
    </div>
  );
}

export default App;
