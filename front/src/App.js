import './App.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import MainPageWorker from './pages/MainPageWorker';
import Contract from './pages/Contract'
import ArchiveUser from './pages/ArchiveUser'
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Archive from './pages/Archive'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/mainpage" />} />
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />   
          <Route path="/mainpage" element={<Layout><MainPage /></Layout>} /> 
          <Route path="/mainpageworker" element={<PrivateRoute><Layout><MainPageWorker /></Layout></PrivateRoute>} /> 
          <Route path="/contract" element={<><Layout><Contract /></Layout></>} />
          <Route path="/profile" element={<PrivateRoute><Layout><Profile/></Layout></PrivateRoute>}/>
          <Route path="/archive_user" element={<PrivateRoute><Layout><ArchiveUser /></Layout></PrivateRoute>} />  
          <Route path="/archive" element={<PrivateRoute><Layout><Archive/></Layout></PrivateRoute>} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
