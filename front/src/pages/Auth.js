import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
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
      <input type="submit" />
    </form>
  );
};

export default Auth;
