import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/userhome" element={<UserHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;