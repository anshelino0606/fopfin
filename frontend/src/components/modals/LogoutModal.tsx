import React from 'react';
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
  height: 200px;
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

const ConfirmMessage = styled.div`
  width: 288px;
  height: 56px;
  border: 1px solid #5fa8d3;
  border-radius: 12px;
  background: #fff;
  padding: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #1b1d1f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
`;

const ActionButton = styled.button`
  border-radius: 8px;
  padding: 12px 12px;
  width: 64px;
  height: 36px;
  background: #5fa8d3;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const LogoutModal: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/settings');
  };

  const handleConfirm = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <BackButton onClick={handleBack}>
          ← Назад
        </BackButton>
        <ConfirmMessage>
          Вийти з облікового запису?
        </ConfirmMessage>
        <ButtonsContainer>
          <ActionButton onClick={handleConfirm}>Так</ActionButton>
          <ActionButton onClick={handleBack}>Ні</ActionButton>
        </ButtonsContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogoutModal; 