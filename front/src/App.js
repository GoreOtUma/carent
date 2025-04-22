import './App.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/mainpage" />} />

          {/* Публичные страницы */}
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />

          {/* Приватные страницы */}
          <Route path="/mainpage" element={<PrivateRoute><Layout><MainPage /></Layout></PrivateRoute>} />
          
          {/* Остальные страницы аналогично */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
