import React from "react";
import { useForm } from "react-hook-form";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { useNavigate } from "react-router-dom";
import ItWorkSidebar from "../components/ItWorkSidebar";
import "../styles/Registration.css";
//import api from "../API/axiosInstance"

const SignUp = () => {
  const { register, formState: { errors }, handleSubmit, reset, watch } = useForm({
    mode: "onBlur",
  });
  
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {

    const payload = {
      surname: data.surname,  
      name: data.name,
      patronimic: data.patronimic,
      telephone: data.telephone,
      VU: data.VU,
      password: data.password,
      email: data.email,
    };


    try {
      //await api.post('users', payload);
      //localStorage.setItem("auth", "true");
      navigate('/mainpage');
      reset();
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
        <div className="registration__message">
          <p className="main-message">Регистрация</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="registration__inputs">
          <div className="surname-input">
            <MyInput
              {...register("surname", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Фамилия не может быть пустой" },
                maxLength: { value: 255, message: "Слишком длинная фамилия" },
              })}
              label="Фамилия"
              type="text"
              placeholder="Введите фамилию"
              id="surname"
              name="surname"
            />
          </div>
          {errors?.surname && <p style={{ color: "red" }}>{errors?.surname?.message}</p>}

          <div className="name-input">
            <MyInput
              {...register("name", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Имя не может быть пустым" },
                maxLength: { value: 255, message: "Слишком длинное имя" },
              })}
              label="Имя"
              type="text"
              placeholder="Введите имя"
              id="name"
              name="name"
            />
          </div>
          {errors?.name && <p style={{ color: "red" }}>{errors?.name?.message}</p>}

          <div className="patronimic-input">
            <MyInput
              {...register("patronimic", {
                required: "Поле обязательно к заполнению",
              })}
              label="Отчество"
              type="text"
              placeholder="Введите отчество"
              id="patronimic"
              name="patronimic"
            />
          </div>
          {errors?.patronimic && <p style={{ color: "red" }}>{errors?.patronimic?.message}</p>}

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
              {...register("Passport", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Паспорт должен содержать 10 цифр" },
              })}
              label="Серия и номер паспорта"
              type="text"
              placeholder="Введите серию и номер паспорта"
              id="passport"
              name="passport"
            />
          </div>
          {errors?.passport && <p style={{ color: "red" }}>{errors?.passport?.message}</p>}

          <div className="VU-input">
            <MyInput
              {...register("VU", {
                required: "Поле обязательно к заполнению",
                minLength: { value: 1, message: "Вод. удостоверение должено содержать 10 цифр" },
              })}
              label="Серия и номер ВУ"
              type="text"
              placeholder="Введите серию и номер ВУ"
              id="VU"
              name="VU"
            />
          </div>
          {errors?.VU && <p style={{ color: "red" }}>{errors?.VU?.message}</p>}

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
