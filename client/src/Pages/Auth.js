import { useState } from "react";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // email, pwd state를 가져오는 함수 작성

  // email, pwd를 submit 했을때 api와 통신하는 함수 작성

  const toggleAccount = () => {
    setNewAccount((bool) => !bool);
  };

  return (
    <>
      {newAccount ? (
        <>
          <h1>회원가입</h1>
          <form>
            <input type="email" placeholder="이메일" required />
            <input
              type="password"
              placeholder="비밀번호"
              minLength="8"
              required
            />
            <button type="submit">회원가입</button>
          </form>
        </>
      ) : (
        <>
          <h1>로그인</h1>
          <form>
            <input type="email" placeholder="이메일" required />
            <input
              type="password"
              placeholder="비밀번호"
              minLength="8"
              required
            />
            <button type="submit">로그인</button>
          </form>
        </>
      )}
      {newAccount ? (
        <button onClick={toggleAccount}>로그인 하러 가기</button>
      ) : (
        <button onClick={toggleAccount}>회원가입 하러 가기</button>
      )}
    </>
  );
};

export default Auth;
