import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { decode } from "jsonwebtoken";
import { ClipLoader } from "react-spinners";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Navigation";
import Routes from "./Routes";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (!infoLoaded) {
    return <ClipLoader size={150} color="#123abc" />;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={handleLogOut} />
          <Routes setToken={setToken} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
