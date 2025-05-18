import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Инициализируем состояние из localStorage при создании
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем аутентификацию при монтировании
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          const userData = {
            id: decoded?.user_id,
            role: decoded?.user_role,
            email: decoded?.email
          };
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);