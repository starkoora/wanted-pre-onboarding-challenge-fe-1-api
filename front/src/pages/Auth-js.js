import React, { useEffect, useState } from "react";
import axios from "axios";
import { set, useForm } from "react-hook-form";

const Auth = (data) => {
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));

    if (token) {
      window.location.href = "/";
    }
  }, [token]);

  const onSubmit = (data) => {
    const email = data.email;
    const pw = data.pw;

    axios({
      method: "post",
      url: "http://localhost:8080/users/login",
      data: {
        email: email,
        password: pw,
      },
    }).then((res) => {
      window.localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="email"
        {...register("email", {
          required: "email을 입력해주세요",
          pattern: {
            value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "올바른 email 주소를 입력해주세요.",
          },
        })}
      />
      <p>{errors.email?.message}</p>
      <input
        placeholder="password"
        {...register("pw", {
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 8,
            message: "비밀번호를 8글자 이상입니다.",
          },
        })}
      />
      <p>{errors.pw?.message}</p>
      <button type="submit">로그인</button>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Auth;
