import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  display: flex;
  justify-content: center;
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 428px;
  min-height: 100vh;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 12px;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  width: 100%;
`;

const BackButton = styled.button`
  padding: 11px 8px;
  width: 81px;
  height: 44px;
  background: none;
  border: none;
  font-family: "SF Pro", sans-serif;
  font-weight: 590;
  font-size: 17px;
  line-height: 129%;
  color: ${props => props.theme.mode === 'dark' ? 'var(--text-dark)' : 'var(--text-light)'};
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.02em;
  margin-left: 12px;
`;

const HeaderTitle = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SettingsTitle = styled.div`
  flex: 1;
  height: 56px;
  border: 3px solid var(--primary-color);
  border-radius: 12px;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : '#fff'};
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.mode === 'dark' ? 'var(--text-dark)' : 'var(--text-light)'};
`;

const MainContent = styled.div`
  flex: 1;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px;
  cursor: pointer;
  color: ${props => props.theme.mode === 'dark' ? 'var(--text-dark)' : 'var(--text-light)'};
  border: 2px solid #5fa8d3;
  border-radius: 12px;
`;

const SettingsIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const SettingsText = styled.div<{ width?: string }>`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  color: ${props => props.theme.mode === 'dark' ? 'var(--text-dark)' : 'var(--text-light)'};
  flex: 1;
`;

const ThemeToggle = styled.div<{ isActive: boolean }>`
  width: 72px;
  height: 32px;
  background: #000000;
  border-radius: 16px;
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
   
    top: 50%; 
    transform: translateY(-50%); 
    transition: left 0.3s ease;
    left: ${props => props.isActive ? '44px' : '2px'};
    transition: left 0.3s ease;
  }
`;

const BottomNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 12px 0;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 428px;
  margin: 0 auto;
`;

const NavIcon = styled.button<{ active?: boolean }>`
  width: 100px;
  height: 100px;
  border: 2px solid var(--primary-color);
  border-radius: 24px;
  background: ${props => props.active ? 'var(--primary-color)' : props.theme.mode === 'dark' ? 'var(--background-dark)' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  img {
    width: 76px;
    height: 76px;
    object-fit: contain;
  }
`;

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [email] = useState('user@example.com'); 

  const handleBack = () => {
    navigate(-1);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={handleBack}>
            ← Назад
          </BackButton>
          <HeaderTitle>
            <SettingsTitle>
              Налаштування
            </SettingsTitle>
          </HeaderTitle>
        </Header>

        <MainContent>
          <SettingsItem>
            <SettingsIcon>
              <img src="/icons/profile.png" alt="Профіль" />
            </SettingsIcon>
            <SettingsText width="200px">
              {email}
            </SettingsText>
          </SettingsItem>

          <SettingsItem onClick={handleThemeToggle}>
            <ThemeToggle isActive={theme.mode === 'dark'} />
            <SettingsText width="132px">Тема</SettingsText>
            
          </SettingsItem>

          <SettingsItem onClick={() => navigate('/settings/users')}>
            <SettingsIcon>
              <img src="/icons/users.png" alt="Користувачі" />
            </SettingsIcon>
            <SettingsText width="196px">Користувачі</SettingsText>
          </SettingsItem>

          <SettingsItem onClick={() => navigate('/settings/categories')}>
            <SettingsIcon>
              <img src="/icons/categories.png" alt="Категорії" />
            </SettingsIcon>
            <SettingsText width="167px">Категорії</SettingsText>
          </SettingsItem>

          <SettingsItem onClick={() => navigate('/settings/delete-data')}>
            <SettingsIcon>
              <img src="/icons/delete.png" alt="Видалити дані" />
            </SettingsIcon>
            <SettingsText width="218px">Видалити дані</SettingsText>
          </SettingsItem>

          <SettingsItem onClick={() => navigate('/settings/logout')}>
            <SettingsIcon>
              <img src="/icons/logout.png" alt="Вийти" />
            </SettingsIcon>
            <SettingsText width="142px">Вийти</SettingsText>
          </SettingsItem>
        </MainContent>

        <BottomNavigation>
          <NavIcon onClick={() => navigate('/expenses')}>
            <img src="/icons/expenses.png" alt="Витрати" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/income')}>
            <img src="/icons/income.png" alt="Надходження" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/statistics')}>
            <img src="/icons/statistics.png" alt="Статистика" />
          </NavIcon>
          <NavIcon active>
            <img src="/icons/settings.png" alt="Налаштування" />
          </NavIcon>
        </BottomNavigation>
      </PageContainer>
    </PageWrapper>
  );
};