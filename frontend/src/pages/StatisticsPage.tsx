import React from 'react';
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

const StatisticsTitle = styled.div`
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
  padding: 16px;
  min-height: calc(100vh - 160px - 100px);
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

const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={handleBack}>
            ← Назад
          </BackButton>
          <HeaderTitle>
            <StatisticsTitle>
              Статистика
            </StatisticsTitle>
          </HeaderTitle>
        </Header>

        <MainContent>
          {/* Тут буде контент статистики */}
        </MainContent>

        <BottomNavigation>
          <NavIcon onClick={() => navigate('/expenses')}>
            <img src="/icons/expenses.png" alt="Витрати" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/income')}>
            <img src="/icons/income.png" alt="Надходження" />
          </NavIcon>
          <NavIcon active>
            <img src="/icons/statistics.png" alt="Статистика" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/settings')}>
            <img src="/icons/settings.png" alt="Налаштування" />
          </NavIcon>
        </BottomNavigation>
      </PageContainer>
    </PageWrapper>
  );
};

export default StatisticsPage; 