
import Login from './features/auth/pages/login';
import Signup from './features/auth/pages/signup';
import { StartPage } from './features/landing/pages/StartPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <Signup />
    // <StartPage />
    // <Dashboard />
    // <Home />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/auth/register" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>

  )
}

export default App;
