import React, { useState } from "react";
import styled from "styled-components";
import CenterSection from "../components/template/CenterSection";
import Input from "components/atoms/Input";
import Header from "components/modules/Header";
import Button from "components/atoms/Button";

const Auth = () => {
  const [id, setId] = useState();
  const [pw, setPw] = useState();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log((e.target as HTMLInputElement).value);
  };
  return (
    <CenterSection>
      <Header title="로그인" />

      <InputWrapper>
        <Input placeholder="id" onChange={handleChange} />
        <Input placeholder="password" onChange={handleChange} />
      </InputWrapper>
      <Btns>
        <Button onClick={() => console.log("login")} name="로그인" />
        <Button onClick={() => console.log("signup")} name="회원가입" />
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
