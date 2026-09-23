import { useState } from 'react';
import AuthAPI from './api/AuthAPI';

function Login({ onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Сбрасываем ошибку перед новой попыткой

    // Вызываем наш фейковый API
    const result = AuthAPI.login(login, password);

    if (result.success) {
      // Если успех, сообщаем главному приложению, что мы вошли
      onLoginSuccess(result.user);
    } else {
      // Если ошибка, показываем сообщение
      setError(result.message);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Вход в систему</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;