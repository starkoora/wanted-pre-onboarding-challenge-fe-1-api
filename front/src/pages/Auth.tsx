import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CenterSection from "../components/template/CenterSection";
import Input from "components/atoms/Input";
import Header from "components/modules/Header";
import Button from "components/atoms/Button";
import axios from "axios";

const Auth = () => {
  const [authToken, setAuthToken] = useState<string | null>();

  useEffect(() => {
    if (authToken) window.location.href = "/";
  }, [authToken]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.match(emailFormat)) {
      alert("올바른 메일 형식이 아닙니다.");
    }
    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
    }

    const buttonClassify = (event.target as HTMLButtonElement).innerText;
    if (buttonClassify === "로그인") {
      axios({
        method: "POST",
        url: "http://localhost:8080/users/login",
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        window.localStorage.setItem("token", res.data.token);
        setAuthToken(window.localStorage.getItem("token"));
      });
    } else if (buttonClassify === "회원가입") {
      axios({
        method: "POST",
        url: "http://localhost:8080/users/create",
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        if (res.data.status === 200) alert("회원가입이 완료되었습니다.");
        else alert("회원가입에 실패하였습니다.");
      });
    }
  }

  return (
    <CenterSection>
      <Header title="로그인" />

      <InputWrapper>
        <Input id="email" placeholder="email" />
        <Input id="password" placeholder="password" />
      </InputWrapper>
      <Btns>
        <Button onClick={handleClick} name="로그인" />
        <Button onClick={handleClick} name="회원가입" />
      </Btns>
    </CenterSection>
  );
};

export default Auth;

const InputWrapper = styled.div`
  width: 100%;
`;

const Btns = styled.div`
  width: 50%;
  margin: 0 auto;
`;
