import { ChatBox } from "./components/ChatBox";
import { LoginForm } from "./components/Login/Login-Form";
import { SignUp } from "./components/Signup/Signup-Form";
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<ChatBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
