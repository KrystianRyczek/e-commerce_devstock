"use client";

import FormContainer from "./form-container";
import { useRef, useState } from "react";

import UserNameContainer from "./user-name-container";
import UserPasswordContainer from "./user-password-container";

export default function LoginUser() {
  const loginRef = useRef<HTMLInputElement>(null);
  const [logInValueError, setLogInValueError] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const goFowardHandler = () => {
    if (loginRef.current) {
      const value = loginRef.current.value;
      if (value.length === 0) {
        setLogInValueError("Please enter your email or mobile phone number.");
        return;
      }
    }
    setLogInValueError("");
    setIsVisible(false);
  };
  return (
    <FormContainer
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      logInValueError={logInValueError}
    >
      <UserNameContainer
        isVisible={isVisible}
        loginRef={loginRef}
        goFowardHandler={goFowardHandler}
      />
      <UserPasswordContainer isVisible={!isVisible} />
    </FormContainer>
  );
}
