import styled from "@emotion/styled";
import { ButtonLabel } from "../typography";
import { ButtonHTMLAttributes, FC } from "react";

import colors from "@/style/colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  return (
    <Root {...props}>
      <ButtonLabel>{props.children}</ButtonLabel>
    </Root>
  );
};

const Root = styled.button<ButtonProps>`
  font-family: var(--font-quantico);
  cursor: pointer;

  background: 0;
  outline: 0;
  border: 0;
  padding-left: 1em;
  padding-right: 1em;
  margin-left: 8px;
  margin-right: 8px;

  position: relative;
  height: 50px;
  background-image: url("/default-body.svg");

  ${(props) => props.fullWidth && "width: calc(100% - 16px);"}

  span {
    color: ${colors.primary};
  }

  &::after {
    content: url("/default-left.svg");

    position: absolute;
    left: -8px;
    top: 0;
    bottom: 0;

    width: 8px;
    height: 50px;
  }

  &::before {
    content: url("/default-right.svg");

    position: absolute;
    right: -8px;
    top: 0;
    bottom: 0;

    width: 8px;
    height: 50px;
  }

  &:hover {
    background-image: url("/hover-body.svg");

    &::after {
      content: url("/hover-left.svg");
    }
    &::before {
      content: url("/hover-right.svg");
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
