import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import NavBar from './components/NavBar';
import { auth, db } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <div className="App bg-light">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <Routes>
            <Route path='/' element={<Welcome />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
