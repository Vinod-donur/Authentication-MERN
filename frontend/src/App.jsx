import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import VerifyPage from '../pages/VerifyPage';
import { Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-300 to-gray-400 flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verifyEmail" element={<VerifyPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App
