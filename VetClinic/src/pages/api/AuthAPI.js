const AuthAPI = {
    // Наша "база данных" пользователей
    users: [
      { id: 1, login: "admin", password: "123", role: "admin" },
      { id: 2, login: "vet", password: "123", role: "user" },
    ],
  
    // Метод входа
    login: function (login, password) {
      // Ищем пользователя с таким логином и паролем
      const user = this.users.find((u) => u.login === login && u.password === password);
  
      if (user) {
        // Генерируем фейковый токен (в реальности это делает сервер)
        const fakeToken = "mock_jwt_token_" + Date.now() + "_" + user.id;
        
        // 🔥 ЗАДАТОК НА ТОКЕН: сохраняем его в localStorage браузера
        localStorage.setItem("authToken", fakeToken);
        localStorage.setItem("currentUser", JSON.stringify({ id: user.id, login: user.login, role: user.role }));
  
        return { 
          success: true, 
          token: fakeToken, 
          user: { id: user.id, login: user.login, role: user.role } 
        };
      }
      
      return { success: false, message: "Неверный логин или пароль" };
    },
  
    // Метод выхода
    logout: function () {
      // Удаляем токен и данные пользователя из хранилища
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    },
  
    checkAuth: function () {
      const token = localStorage.getItem("authToken");
      const userStr = localStorage.getItem("currentUser");
      
      if (token && userStr) {
        return { isAuthenticated: true, user: JSON.parse(userStr) };
      }
      return { isAuthenticated: false, user: null };
    },
  };
  
  export default AuthAPI;