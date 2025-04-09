import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 36px;
`;

const AuthContainer = styled.div`
  width: 356px;
  height: 348px;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 48px;
  line-height: 67%;
  letter-spacing: 0.01em;
  text-align: center;
  color: #1b1d1f;
  margin: 0 0 36px 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 36px;
  }
`;

const InputLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #1b1d1f;
  width: 100%;
  margin-bottom: 8px;
`;

const Input = styled.input`
  border: 1px solid #3a7ca5;
  border-radius: 8px;
  width: 100%;
  height: 42px;
  background: #fff;
  padding: 0 12px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const LoginButton = styled.button`
  border-radius: 8px;
  padding: 6px 35.5px;
  width: 128px;
  height: 36px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/expenses');
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit}>
        <AuthContainer>
          <Title>Вхід</Title>
          
          <InputContainer>
            <InputLabel>
              Email або телефон
            </InputLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>
              Пароль
            </InputLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>

          <ButtonContainer>
            <LoginButton type="submit">
              Увійти
            </LoginButton>
          </ButtonContainer>
        </AuthContainer>
      </form>
    </PageWrapper>
  );
};

export default AuthPage; 