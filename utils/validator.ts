import validator from "validator";

export const loginValidator = (loginForm: {
  email: string;
  password: string;
}) => {
  if (Object.values(loginForm).some((v) => !v)) {
    return {
      isValid: false,
      message: "이메일 / 패스워드 값이 비어있습니다",
    };
  }

  if (!validator.isEmail(loginForm.email)) {
    return {
      isValid: false,
      message: "이메일 형식에 맞게 입력해주세요",
    };
  }
  if (!validator.isLength(loginForm.password, { min: 8 })) {
    return {
      isValid: false,
      message: "패스워드 길이는 8 이상이어야 합니다",
    };
  }
  return {
    isValid: true,
  };
};
