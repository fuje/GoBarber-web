import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  hasError: boolean;
  hasValue: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: #232129;
  border: 2px solid #232129;
  border-radius: 10px;
  color: #666360;

  ${props =>
    props.hasError &&
    css`
      border: 2px solid #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

  ${props =>
    props.hasValue &&
    css`
      color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
