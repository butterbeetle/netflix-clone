export enum AuthErrorList {
  REQUIRED_ERROR = "REQUIRED_ERROR",
  INCORRECT_PASSWORD_ERROR = "INCORRECT_PASSWORD_ERROR",
  EMAIL_NOT_EXISTS_ERROR = "EMAIL_NOT_EXISTS_ERROR",
}

export class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: T;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

type AuthErrorName = "A" | "B";

export class AuthError extends ErrorBase<AuthErrorName> {}

export const AuthErrorString = (type: string) => {
  switch (type) {
    case AuthErrorList.REQUIRED_ERROR:
      return "이메일 또는 비밀번호를 제대로 입력해주세요.";
    case AuthErrorList.INCORRECT_PASSWORD_ERROR:
      return "비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.";
    case AuthErrorList.EMAIL_NOT_EXISTS_ERROR:
      return "죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수 없습니다.";
  }
};
