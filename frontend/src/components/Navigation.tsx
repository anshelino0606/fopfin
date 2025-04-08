import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? '#5bb5e9' : '#666'};
  font-size: 12px;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavItem to="/expenses" $active={location.pathname === '/expenses'}>
        <img src="/icons/expenses.png" alt="Витрати" />
        Витрати
      </NavItem>
      <NavItem to="/income" $active={location.pathname === '/income'}>
        <img src="/icons/income.png" alt="Надходження" />
        Надходження
      </NavItem>
      <NavItem to="/statistics" $active={location.pathname === '/statistics'}>
        <img src="/icons/statistics.png" alt="Статистика" />
        Статистика
      </NavItem>
      <NavItem to="/settings" $active={location.pathname === '/settings'}>
        <img src="/icons/settings.png" alt="Налаштування" />
        Налаштування
      </NavItem>
    </NavContainer>
  );
};

export default Navigation; 