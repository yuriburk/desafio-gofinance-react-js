import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, NavItem } from './styles';
import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const isHome = useLocation().pathname === '/';
  const isImport = useLocation().pathname === '/import';

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <NavItem active={isHome.toString()} to="/">
            Listagem
          </NavItem>
          <NavItem active={isImport.toString()} to="/import">
            Importar
          </NavItem>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
