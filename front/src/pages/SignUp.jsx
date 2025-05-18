import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { useNavigate } from "react-router-dom";
import ItWorkSidebar from "../components/ItWorkSidebar";
import "../styles/Registration.css";
import { AuthContext } from "../context/AuthContext";
import api from "../API/axiosInstance"

const SignUp = () => {
  const {setUser} = useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit, reset, watch } = useForm({
    mode: "onBlur",
  });
  
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {

    const payload = {
      f_name: data.f_name,  
      name: data.name,
      l_name: data.l_name,
      s_passport: parseInt(data.s_passport, 10),
      n_passport: parseInt(data.n_passport, 10),
      telephone: parseInt(data.telephone, 10),
      n_vu: parseInt(data.n_vu, 10),
      password: data.password,
      email: data.email,
      role: "user",
    };

    try {
      const resp = await api.post('users', payload);
      if (resp.status === 200) {
        const payloadauth = {email: data.email,password: data.password}
        const response = await api.post("auth", payloadauth);

        if (response.status === 200) {

          const accessToken = response.data.access_token;
          const decoded = JSON.parse(atob(accessToken.split('.')[1]));
          const userRole = decoded?.user_role || "unknown_user";
          const userId = decoded?.user_id;

          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("auth", "true");
          localStorage.setItem("user_role", userRole);
          localStorage.setItem("user_id", userId);
          setUser({ id: userId, role: userRole });
          navigate('/mainpage');
          reset();
        }
      }
    } catch (e) {
        console.error(e.response?.data);
    }
  };

  const handleRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="registration-page">
      <div className="registration">
      <div className="registation_main">
        <div className="registration__message">
          <p className="main-message">Регистрация</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="registration__inputs">
          <div className="surname-input">
            <MyInput
              {...register("l_name", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Фамилия не может быть пустой" },
                maxLength: { value: 50, message: "Слишком длинная фамилия" },
              })}
              label="Фамилия"
              type="text"
              placeholder="Введите фамилию"
              id="l_name"
              name="l_name"
            />
          </div>
          {errors?.l_name && <p style={{ color: "red" }}>{errors?.l_name?.message}</p>}

          <div className="name-input">
            <MyInput
              {...register("f_name", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Имя не может быть пустым" },
                maxLength: { value: 50, message: "Слишком длинное имя" },
              })}
              label="Имя"
              type="text"
              placeholder="Введите имя"
              id="f_name"
              name="f_name"
            />
          </div>
          {errors?.f_name && <p style={{ color: "red" }}>{errors?.f_name?.message}</p>}

          <div className="patronimic-input">
            <MyInput
              {...register("name", {
                required: "Поле обязательно к заполнению",
              })}
              label="Отчество"
              type="text"
              placeholder="Введите отчество"
              id="name"
              name="name"
            />
          </div>
          {errors?.name && <p style={{ color: "red" }}>{errors?.name?.message}</p>}

          <div className="email-input">
            <MyInput
              {...register("email", {
                required: "Поле обязательно к заполнению",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Некорректный email",
                },
              })}
              label="E-mail"
              type="email"
              placeholder="Введите E-mail"
              id="email"
              name="email"
            />
          </div>
          {errors?.email && <p style={{ color: "red" }}>{errors?.email?.message}</p>}

          <div className="telephone-input">
            <MyInput
              {...register("telephone", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Номер телефона должен содержать 11 цифр" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Допускаются только цифры"
                },
              })}
              label="Номер телефона"
              type="text"
              placeholder="Введите номер телефона"
              id="telephone"
              name="telephone"
            />
          </div>
          {errors?.telephone && <p style={{ color: "red" }}>{errors?.telephone?.message}</p>}

          <div className="Passport-input">
            <MyInput
              {...register("s_passport", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Паспорт должен содержать 10 цифр" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Допускаются только цифры"
                },
              })}
              label="Серия паспорта"
              type="text"
              placeholder="Введите серию паспорта"
              id="s_passport"
              name="s_passport"
            />
          </div>
          {errors?.s_passport && <p style={{ color: "red" }}>{errors?.s_passport?.message}</p>}
          
          <div className="Passport-input">
            <MyInput
              {...register("n_passport", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Паспорт должен содержать 10 цифр" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Допускаются только цифры"
                },
              })}
              label="номер паспорта"
              type="text"
              placeholder="Введите номер паспорта"
              id="n_passport"
              name="n_passport"
            />
          </div>
          {errors?.n_passport && <p style={{ color: "red" }}>{errors?.n_passport?.message}</p>}

          <div className="VU-input">
            <MyInput
              {...register("n_vu", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Вод. удостоверение должено содержать 10 цифр" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Допускаются только цифры"
                },
              })}
              label="Серия и номер ВУ"
              type="text"
              placeholder="Введите серию и номер ВУ"
              id="n_vu"
              name="n_vu"
            />
          </div>
          {errors?.n_vu && <p style={{ color: "red" }}>{errors?.n_vu?.message}</p>}

          <div className="password-input">
            <MyInput
              {...register("password", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 8, message: "Пароль должен быть не меньше 8 символов" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/,
                  message: "Пароль должен содержать хотя бы одну заглавную букву, одну строчную и одну цифру",
                },
              })}
              label="Пароль"
              type="password"
              placeholder="Придумайте пароль"
              id="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          {errors?.password && <p style={{ color: "red" }}>{errors?.password?.message}</p>}

          <div className="password-verification-input">
            <MyInput
              {...register("confirmPassword", {
                required: "Поле обязательно к заполнению",
                validate: (value) => value === password || "Пароли не совпадают",
              })}
              label="Пароль"
              type="password"
              placeholder="Повторите пароль"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="current-password"
            />
          </div>
          {errors?.confirmPassword && <p style={{ color: "red" }}>{errors?.confirmPassword?.message}</p>}

          <div className="buttons">
            <MyButton className="button-registration primary-button auth" type="submit">Зарегистироваться</MyButton>
          </div>
        </form>
        </div>

        <div className="to-sign-in">
          <span className="secondary-text">Уже есть аккаунт?</span>
          <MyButton className="button-sign-in secondary-button auth" type="button" onClick={handleRedirect}>Войти</MyButton>
        </div>
      </div>
      <ItWorkSidebar />
    </div>
  );
};

export default SignUp;
