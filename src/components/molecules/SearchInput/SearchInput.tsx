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

const StyledSearchInput = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 280px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  margin-top: 12px;
  cursor: pointer;
`;

const SearchInput = () => {
  const [val, setVal] = useState("");

  return (
    <StyledSearchInput>
      <TextInput
        name="search"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        label="Search"
      />
      <Button>Search</Button>
    </StyledSearchInput>
  );
};

export default SearchInput;
