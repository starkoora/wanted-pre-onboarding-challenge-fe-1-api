import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth";
import Todo from "./Pages/Todo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
