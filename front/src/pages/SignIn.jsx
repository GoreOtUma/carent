import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ItWorkSidebar from "../components/ItWorkSidebar";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import "../styles/Registration.css";
import { AuthContext } from "../context/AuthContext";
import api from "../API/axiosInstance";
import UserService from "../API/UserService"

const SignIn = () => {
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {register, handleSubmit,formState: { errors }} = useForm({ mode: "onBlur" });


  const login = async (data) => {
    const payload = {email: data.email, password: data.password}
    
    try {
      const response = await api.post("auth", payload);
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const decoded = JSON.parse(atob(accessToken.split('.')[1]));
        const userRole = decoded?.user_role || "unknown_user";
        const userId = decoded?.user_id;

        // Сохраняем данные в localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("auth", "true");
        
        // Создаем объект пользователя
        const userData = { 
          id: userId, 
          role: userRole,
          email: data.email
        };
        
        // Сохраняем объект пользователя целиком
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Обновляем контекст
        navigate('/mainpage');
      }      
    } catch (error) {
      console.error(error.response?.data || error);
      setErrorMessage("Неверный логин или пароль!");
    }
  };

  const handleRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="registration-page">
      <div className="registration">
      <div className="registation_main">
        <div className="registration__message">
          <p className="main-message"> Вход </p>
          <p className="additional-message secondary-text "></p>
        </div>

        {errorMessage && <p style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</p>}

        <form className="registration__inputs" onSubmit={handleSubmit(login)}>
          <div className="email-input">
            <MyInput
              id="email"
              placeholder="Введите email"
              type="text"
              label="Email"
              {...register("email", {
                required: "Поле обязательно для заполнения",
              })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="password-input">
            <MyInput
              id="password"
              placeholder="Введите пароль"
              type="password"
              label="Пароль"
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="additionally">
            <div className="remember-me">
              <input type="checkbox" id="remember-me__input" />
              <label htmlFor="remember-me__input">Запомнить меня</label>
            </div>
            <div className="forgot-password">Забыли пароль?</div>
          </div>

          <div className="buttons">
            <MyButton className="button-registration primary-button auth" type="submit">Войти</MyButton>
          </div>
        </form>
      </div>

        <div className="to-sign-up">
          <span className="secondary-text">Нет аккаунта?</span>
          <MyButton className="button-registration secondary-button auth" type="button" onClick={handleRedirect}>Создать аккаунт</MyButton>
        </div>
      </div>
      <ItWorkSidebar />
    </div>
  );
};

export default SignIn;