import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  width: 320px;
  background: #3a7ca5;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  color: #1b1d1f;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: -0.02em;
  margin-left: 12px;
`;

const UsersContainer = styled.div`
  border: 2px solid #5fa8d3;
  border-radius: 16px;
  width: 280px;
  height: 480px;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserItem = styled.div`
  padding: 8px;
  border: 2px solid #5fa8d3;
  border-radius: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserEmail = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const UserCategories = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #000;
  margin-top: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
`;

const ActionButton = styled.button`
  width: 100px;
  height: 32px;
  border-radius: 8px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 129%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserLabel = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 24px;
  line-height: 145%;
  letter-spacing: 0.05em;
  color: #000;
  margin-right: auto;
`;

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  height: 48px;
  border: 1px solid ${({ error }) => (error ? '#ff4d4d' : '#5fa8d3')};
  border-radius: 8px;
  padding: 0 12px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  margin-bottom: 16px;
  background: ${({ error }) => (error ? '#ffe6e6' : 'white')};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  background: #5fa8d3;
  color: #fff;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 8px;
`;

const UsersModal: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<{ email: string, categories: string[] }[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const categories = [
    'Зарплата', 'Подарунки (надходження)', 'Підробіток', 'Продукти', 'Пальне',
    'Алкоголь і сигарети', 'Обслуговування авто', 'Оренда житла', 'Комунальні послуги',
    'Зв\'язок', 'Подарунки (витрати)', 'Заощадження', 'Кафе та ресторани', 'Здоров\'я',
  ];

  const handleBack = () => {
    navigate('/settings');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    setEmailError(false);
    setCategoryError(false);

    if (!email) {
      setEmailError(true);
    }

    if (selectedCategories.length === 0) {
      setCategoryError(true);
    }

    if (!email || selectedCategories.length === 0) {
      return; 
    }

    if (editingUserIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = { email, categories: selectedCategories };
      setUsers(updatedUsers);
    } else {
      const newUser = { email, categories: selectedCategories };
      setUsers((prev) => [...prev, newUser]);
    }

    setEmail('');
    setSelectedCategories([]);
    setShowAddUserForm(false);
    setEditingUserIndex(null);
  };

  const handleEditUser = (index: number) => {
    const user = users[index];
    setEmail(user.email);
    setSelectedCategories(user.categories);
    setEditingUserIndex(index);
    setShowAddUserForm(true);
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = users.filter((_, idx) => idx !== index);
    setUsers(updatedUsers);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <BackButton onClick={handleBack}>← Назад</BackButton>
        <UsersContainer>
          <ActionButtons>
            <UserLabel>Користувачі</UserLabel>
            <ActionButton onClick={() => setShowAddUserForm(true)}>+</ActionButton>
          </ActionButtons>

          {showAddUserForm ? (
            <div>
              <Input
                type="text"
                placeholder="Email або номер телефону"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />
              {emailError && (
                <ErrorMessage>Будь ласка, введіть пошту або номер телефону.</ErrorMessage>
              )}
              {categories.map((category) => (
                <CheckboxContainer key={category}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label>{category}</label>
                </CheckboxContainer>
              ))}
              {categoryError && (
                <ErrorMessage>Будь ласка, виберіть хоча б одну категорію.</ErrorMessage>
              )}
              <ButtonGroup>
                <Button onClick={handleSubmit}>Надати дозвіл</Button>
              </ButtonGroup>
            </div>
          ) : (
            <UsersList>
              {users.map((user, index) => (
                <UserItem key={index}>
                  <UserEmail>{user.email}</UserEmail>
                  <UserCategories>{user.categories.join(', ')}</UserCategories>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEditUser(index)}>Редагувати</ActionButton>
                    <ActionButton onClick={() => handleDeleteUser(index)}>Видалити</ActionButton>
                  </ActionButtons>
                </UserItem>
              ))}
            </UsersList>
          )}
        </UsersContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UsersModal;
