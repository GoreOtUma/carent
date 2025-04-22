import './App.css';
import Layout from './components/Layout';
import MainLogo from './components/MainLogo';
import MyNavBar from './components/UI/navBar/MyNavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      {<Layout><MainLogo/><SignUp/></Layout>}
    </Router>
  );
}

export default App;
