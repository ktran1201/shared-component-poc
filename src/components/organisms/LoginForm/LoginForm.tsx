import { useState } from "react";
import { TextInput } from "../../atoms/TextInput";
import styled from "styled-components";

interface StyleOverrides {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
}

export interface TextInputStyleOverrides {
  root?: StyleOverrides;
  label?: StyleOverrides;
  input?: StyleOverrides;
  helperText?: StyleOverrides;
}

export interface TextInputTextOverrides {
  label: string;
}

const StyledLoginForm = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  margin-top: 12px;
  cursor: pointer;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: any) => {
    e.preventDefault();
    console.log(`Logging in ${username}...`);
  };

  return (
    <StyledLoginForm>
      <TextInput
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        styleOverrides={{
          root: {
            margin: "0 0 12px",
          },
        }}
      />
      <TextInput
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        styleOverrides={{
          root: {
            margin: "0 0 10px",
          },
        }}
      />
      <Button onClick={loginHandler}>Login</Button>
    </StyledLoginForm>
  );
};

export default LoginForm;
