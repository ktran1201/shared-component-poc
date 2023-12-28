import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {TextInput} from "./index";
import {userEvent} from "@testing-library/user-event";

describe('TextInput', () => {
  const onChangeSpy = vi.fn();

  async function renderTest() {
    render(
      <TextInput name="first-name" id="first-name" onChange={onChangeSpy} label="First name"/>
    );
  }

  it('should render', () => {
    renderTest();
    expect(screen.getByText("First name")).toBeInTheDocument();
  });

  it('should call onChangeSpy when typing', async () => {
    renderTest();

    const input = screen.getByLabelText('First name');

    await userEvent.type(input, 'abc');

    expect(onChangeSpy).toHaveBeenCalledTimes(3);
  });
})
