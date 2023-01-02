import { useState } from "react";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
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
            <input type="password" placeholder="비밀번호" required />
            <button type="submit">회원가입</button>
          </form>
        </>
      ) : (
        <>
          <h1>로그인</h1>
          <form>
            <input type="email" placeholder="이메일" required />
            <input type="password" placeholder="비밀번호" required />
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
