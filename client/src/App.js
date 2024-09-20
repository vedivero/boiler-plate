import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Link 유지

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage'; // 확장자 확인

function App() {
   return (
      <Router>
         <div>
            <Routes>
               <Route path='/' element={LandingPage} />
               <Route path='/login' element={LoginPage} />
               <Route path='/register' element={RegisterPage} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
