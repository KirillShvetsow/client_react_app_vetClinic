import { useState, useEffect } from 'react';
import AuthAPI from './pages/api/AuthAPI.js';
import Login from './pages/Login.jsx'; // ← путь изменился
import VetList from './pages/Vets/VetList.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authStatus = AuthAPI.checkAuth();
    setIsAuthenticated(authStatus.isAuthenticated);
    setCurrentUser(authStatus.user);
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <span>Вы вошли как: <b>{currentUser?.login}</b></span>
        <button onClick={handleLogout}>Выйти</button>
      </header>
      <VetList />
    </div>
  );
}

export default App;