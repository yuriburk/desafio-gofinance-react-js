import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ContainerProps {
  size?: 'small' | 'large';
}

interface NavItemProps {
  active: string;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      height: 38px;
    }
  }
`;

export const NavItem = styled(Link)<NavItemProps>`
  color: #fff;
  text-decoration: none;
  font-size: 15.9px;
  transition: opacity 0.2s;
  position: relative;

  & + a {
    margin-left: 32px;
  }

  &:hover {
    opacity: 0.5;
  }

  ${({ active }) =>
    active === 'true' &&
    css`
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #ff872c;
      }
    `}
`;
