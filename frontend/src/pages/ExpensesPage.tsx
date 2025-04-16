import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import {Expense} from "../utils/types";
import {expenseCategories} from "../utils/mocks";
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

const ExpenseInput = styled.div`
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

const AddButton = styled.button`
  min-width: 56px;
  height: 56px;
  border-radius: 8px;
  background: var(--primary-color);
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const MainContent = styled.div`
  flex: 1;
  background: ${props => props.theme.mode === 'dark' ? 'var(--background-dark)' : 'var(--background-light)'};
  padding-bottom: 100px;
  min-height: calc(100vh - 88px - 100px);
`;

const ExpensesList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ExpenseItem = styled.div`
  background: ${props => props.theme.mode === 'dark' ? '#374578' : '#fff'};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: ${props => props.theme.mode === 'dark' ? 'var(--text-dark)' : 'var(--text-light)'};
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  border-radius: 16px;
  width: 100%;
  max-width: 320px;
  background: #3a7ca5;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AmountInput = styled.input<{ error?: boolean }>`
  width: 100%;
  height: 56px;
  border: 1px solid ${props => (props.error ? '#f44336' : '#5fa8d3')};
  border-radius: 12px;
  background: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  padding: 0 16px;
  color: #000;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const CategorySelect = styled.select<{ error?: boolean }>`
  width: 100%;
  height: 56px;
  border: 1px solid ${props => (props.error ? '#f44336' : '#5fa8d3')};
  border-radius: 12px;
  background: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  padding: 0 16px;
  color: #000;

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const CategoryOption = styled.option`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 20px;
  line-height: 160%;
  padding: 12px;
`;

const AddExpenseButton = styled.button`
  border-radius: 8px;
  padding: 12px 24px;
  width: 128px;
  height: 36px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #fff;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #4a97c2;
  }
`;

const ModalBackButton = styled(BackButton)`
  margin-left: 12px;
`;

export const ExpensesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amountError, setAmountError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddExpense = () => {
    setAmountError(false);
    setCategoryError(false);

    if (!amount) {
      setAmountError(true);
    }
    if (!selectedCategory) {
      setCategoryError(true);
    }

    if (amount && selectedCategory) {
      const newExpense: Expense = {
        amount: parseFloat(amount),
        category: selectedCategory,
        id: Date.now()
      };
      setExpenses([newExpense, ...expenses]);
      setIsModalOpen(false);
      setAmount('');
      setSelectedCategory('');
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <BackButton onClick={handleBack}>
            ← Назад
          </BackButton>
          <HeaderTitle>
            <ExpenseInput>Витрати</ExpenseInput>
            <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
          </HeaderTitle>
        </Header>

        <MainContent>
          <ExpensesList>
            {expenses.map(expense => (
              <ExpenseItem key={expense.id}>
                <div>{expense.category}</div>
                <div>-{expense.amount} ₴</div>
              </ExpenseItem>
            ))}
          </ExpensesList>
        </MainContent>

        <BottomNavigation>
          <NavIcon active>
            <img src="/icons/expenses.png" alt="Витрати" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/income')}>
            <img src="/icons/income.png" alt="Надходження" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/statistics')}>
            <img src="/icons/statistics.png" alt="Статистика" />
          </NavIcon>
          <NavIcon onClick={() => navigate('/settings')}>
            <img src="/icons/settings.png" alt="Налаштування" />
          </NavIcon>
        </BottomNavigation>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <ModalBackButton onClick={() => setIsModalOpen(false)}>
                ← Назад
              </ModalBackButton>
              <AmountInput
                type="number"
                placeholder="Сума"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={amountError}
              />
              {amountError && <div style={{ color: 'red' }}>Будь ласка, введіть суму</div>}
              <CategorySelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                error={categoryError}
              >
                <CategoryOption value="" disabled>
                  Категорія
                </CategoryOption>
                {expenseCategories.map(category => (
                  <CategoryOption key={category} value={category}>
                    {category}
                  </CategoryOption>
                ))}
              </CategorySelect>
              {categoryError && <div style={{ color: 'red' }}>Будь ласка, виберіть категорію</div>}
              <AddExpenseButton onClick={handleAddExpense}>
                Додати
              </AddExpenseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </PageContainer>
    </PageWrapper>
  );
};