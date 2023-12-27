import {render, screen} from "@testing-library/react";
import {TextInput} from "./index";

describe('TextInput', () => {
  const onChangeSpy = jest.fn();

  async function renderTest() {
    render(
      <TextInput name="first-name" id="first-name" onChange={onChangeSpy} label="First name"/>
    );
  }

  it('should render', () => {
    renderTest();
    expect(screen.getByText("First name")).toBeInTheDocument();
  });
})
