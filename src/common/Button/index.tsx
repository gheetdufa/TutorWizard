import { StyledButton } from "./styles";
import { ButtonProps } from "../types";
import React, { useState, useEffect } from 'react';


export const Button = ({
  color,
  fixedWidth,
  children,
  onClick,
}: ButtonProps) => (
  <StyledButton color={color} fixedWidth={fixedWidth} onClick={onClick}>
    {children}
  </StyledButton>
);
